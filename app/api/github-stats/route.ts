// app/api/github-stats/route.ts
import { GitHubStats } from "@/app/creator/types";
import { NextResponse } from "next/server";

type GitHubRepo = {
  name: string;
  stargazers_count: number;
  language: string;
  fork: boolean;
  created_at: string;
  pushed_at: string;
  updated_at: string;
  size: number;
};

type ContributionDay = {
  contributionCount: number;
  date: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type GitHubEvent = {
  type: string;
  created_at: string;
  payload: {
    commits?: Array<{ message: string }>;
    action?: string;
    issue?: { title: string };
    pull_request?: { title: string };
  };
};

// Cache TTL in seconds (5 minutes)
const CACHE_TTL = 300;

// Global cache object
let cache: {
  data: GitHubStats;
  timestamp: number;
} | null = null;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = "thevinayakgore";

  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN is required" },
      { status: 401 },
    );
  }

  // Check if cache is still valid
  const now = Date.now();
  if (cache && now - cache.timestamp < CACHE_TTL * 1000) {
    return NextResponse.json(cache.data, {
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=60`,
        "X-Cache": "HIT",
      },
    });
  }

  try {
    // ─── 1. USER DATA ──────────────────────────────────────────
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userData = await userRes.json();

    // ─── 2. ALL REPOSITORIES (paginated) ──────────────────────
    let allRepos: GitHubRepo[] = [];
    let repoPage = 1;
    const repoPerPage = 100;
    let hasMoreRepos = true;

    while (hasMoreRepos) {
      const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${repoPerPage}&page=${repoPage}&sort=updated`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const repos: GitHubRepo[] = await reposRes.json();

      if (repos.length === 0) {
        hasMoreRepos = false;
      } else {
        allRepos = [...allRepos, ...repos];
        repoPage++;
        if (repos.length < repoPerPage) hasMoreRepos = false;
      }
    }

    // Total stars (across ALL repos)
    const totalStars = allRepos.reduce(
      (acc, repo) => acc + repo.stargazers_count,
      0,
    );

    // Most starred project
    let mostStarred = { name: "", stars: 0 };
    allRepos.forEach((repo) => {
      if (repo.stargazers_count > mostStarred.stars) {
        mostStarred = { name: repo.name, stars: repo.stargazers_count };
      }
    });

    // Top languages
    const languageMap = new Map<string, number>();
    allRepos.forEach((repo) => {
      if (repo.language) {
        languageMap.set(
          repo.language,
          (languageMap.get(repo.language) || 0) + 1,
        );
      }
    });
    const topLanguages = Array.from(languageMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([lang]) => lang);

    // Open source projects (non-fork)
    const openSourceProjects = allRepos.filter((repo) => !repo.fork).length;

    // Total repos
    const totalRepos = allRepos.length;

    // ─── 3. GRAPHQL: CONTRIBUTIONS (last year) ────────────────
    const gqlQuery = `
      {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
          repositoriesContributedTo(first: 100) {
            totalCount
          }
        }
      }
    `;
    const gqlRes = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: gqlQuery }),
    });
    const gqlData = await gqlRes.json();
    const calendar =
      gqlData?.data?.user?.contributionsCollection?.contributionCalendar;
    const totalContributions = calendar?.totalContributions || 0;
    const contributedRepos =
      gqlData?.data?.user?.repositoriesContributedTo?.totalCount || 0;

    // ─── 4. HEATMAP DATA ──────────────────────────────────────
    const heatmapWeeks = calendar?.weeks || [];

    // ─── 5. COMPUTE STREAKS ────────────────────────────────────
    const days: ContributionDay[] =
      calendar?.weeks?.flatMap((w: ContributionWeek) => w.contributionDays) ||
      [];
    days.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    // Longest streak
    let longestStreak = 0;
    let streak = 0;
    for (const day of days) {
      if (day.contributionCount > 0) {
        streak++;
        if (streak > longestStreak) longestStreak = streak;
      } else {
        streak = 0;
      }
    }

    // Current streak - count from today backwards
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const contributionMap = new Map<string, number>();
    days.forEach((day) => {
      const d = new Date(day.date);
      d.setHours(0, 0, 0, 0);
      contributionMap.set(d.toISOString().split("T")[0], day.contributionCount);
    });

    const checkDate = new Date(today);
    for (let i = 0; i < 365; i++) {
      const dateStr = checkDate.toISOString().split("T")[0];
      const count = contributionMap.get(dateStr) || 0;

      if (count > 0) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    // ─── 6. EVENTS: Commits, PRs, Issues (paginated) ──────────
    let totalCommits = 0;
    let totalPullRequests = 0;
    let totalIssues = 0;
    let eventPage = 1;
    const eventPerPage = 100;
    let hasMoreEvents = true;

    while (hasMoreEvents) {
      const eventsRes = await fetch(
        `https://api.github.com/users/${username}/events?per_page=${eventPerPage}&page=${eventPage}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const events: GitHubEvent[] = await eventsRes.json();

      if (events.length === 0) {
        hasMoreEvents = false;
        break;
      }

      events.forEach((event) => {
        switch (event.type) {
          case "PushEvent":
            totalCommits += event.payload.commits?.length || 0;
            break;
          case "PullRequestEvent":
            if (event.payload.action === "opened") {
              totalPullRequests++;
            }
            break;
          case "IssuesEvent":
            if (event.payload.action === "opened") {
              totalIssues++;
            }
            break;
        }
      });

      if (events.length < eventPerPage) {
        hasMoreEvents = false;
      } else {
        eventPage++;
      }
    }

    // ─── 7. TOTAL COMMITS (via GraphQL - more accurate) ──────
    let totalCommitsGQL = 0;
    try {
      const commitQuery = `
        query {
          user(login: "${username}") {
            contributionsCollection {
              totalCommitContributions
              restrictedContributionsCount
            }
          }
        }
      `;
      const commitRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: commitQuery }),
      });
      const commitData = await commitRes.json();
      totalCommitsGQL =
        commitData?.data?.user?.contributionsCollection
          ?.totalCommitContributions || 0;
    } catch {
      totalCommitsGQL = totalCommits;
    }

    // ─── 8. TOTAL PRs & ISSUES (via GraphQL) ──────────────────
    let totalPRsGQL = 0;
    try {
      const prQuery = `
        query {
          user(login: "${username}") {
            pullRequests(first: 1) {
              totalCount
            }
          }
        }
      `;
      const prRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: prQuery }),
      });
      const prData = await prRes.json();
      totalPRsGQL = prData?.data?.user?.pullRequests?.totalCount || 0;
    } catch {
      totalPRsGQL = totalPullRequests;
    }

    let totalIssuesGQL = 0;
    try {
      const issueQuery = `
        query {
          user(login: "${username}") {
            issues(first: 1) {
              totalCount
            }
          }
        }
      `;
      const issueRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: issueQuery }),
      });
      const issueData = await issueRes.json();
      totalIssuesGQL = issueData?.data?.user?.issues?.totalCount || 0;
    } catch {
      totalIssuesGQL = totalIssues;
    }

    // ─── 9. RESPONSE ───────────────────────────────────────────
    const responseData = {
      // User data
      followers: userData.followers || 0,
      publicRepos: userData.public_repos || 0,
      createdAt: userData.created_at,

      // Repo stats
      totalRepos,
      totalStars,
      mostStarred: mostStarred.name,
      mostStarredStars: mostStarred.stars,
      topLanguages,
      openSourceProjects,

      // Contribution stats
      totalContributions,
      contributedRepos,
      longestStreak,
      currentStreak,

      // Heatmap data
      heatmapWeeks,

      // Lifetime stats (GraphQL - most accurate)
      totalCommits: totalCommitsGQL,
      totalPullRequests: totalPRsGQL,
      totalIssues: totalIssuesGQL,
    };

    // Store in global cache
    cache = {
      data: responseData,
      timestamp: now,
    };

    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=60`,
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("GitHub stats error:", error);

    // If we have stale cache, return it instead of error
    if (cache) {
      return NextResponse.json(cache.data, {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=60`,
          "X-Cache": "STALE",
        },
      });
    }

    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 },
    );
  }
}
