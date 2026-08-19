// app/api/github/[username]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  try {
    const [user, repos, orgs, events] = await Promise.all([
      octokit.rest.users.getByUsername({ username }).then((r) => r.data),
      octokit.paginate(octokit.rest.repos.listForUser, {
        username,
        per_page: 100,
        sort: "updated",
      }),
      octokit.rest.orgs.listForUser({ username }).then((r) => r.data),
      octokit.paginate(octokit.rest.activity.listPublicEventsForUser, {
        username,
        per_page: 100,
      }),
    ]);

    // Fetch contributions via GraphQL
    let contributions = null;
    try {
      const query = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    weekday
                    color
                  }
                }
              }
              totalCommitContributions
              totalIssueContributions
              totalPullRequestContributions
              totalPullRequestReviewContributions
              totalRepositoryContributions
              restrictedContributionsCount
            }
          }
        }
      `;
      const gqlRes = await octokit.graphql<{
        user: {
          contributionsCollection: {
            contributionCalendar: Record<string, unknown>;
            totalCommitContributions: number;
            totalIssueContributions: number;
            totalPullRequestContributions: number;
            totalPullRequestReviewContributions: number;
            totalRepositoryContributions: number;
            restrictedContributionsCount: number;
          };
        };
      }>(query, { username });
      contributions = gqlRes.user.contributionsCollection;
    } catch {
      contributions = null;
    }

    return NextResponse.json({
      user: {
        login: user.login,
        id: user.id,
        node_id: user.node_id,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        type: user.type,
        name: user.name,
        company: user.company,
        blog: user.blog,
        location: user.location,
        email: user.email,
        hireable: user.hireable,
        bio: user.bio,
        twitter_username: user.twitter_username,
        public_repos: user.public_repos,
        public_gists: user.public_gists,
        followers: user.followers,
        following: user.following,
        created_at: user.created_at,
        updated_at: user.updated_at,
        total_private_repos: (user as Record<string, unknown>).total_private_repos || null,
        owned_private_repos: (user as Record<string, unknown>).owned_private_repos || null,
        disk_usage: (user as Record<string, unknown>).disk_usage || null,
        collaborators: (user as Record<string, unknown>).collaborators || null,
        two_factor_authentication: (user as Record<string, unknown>).two_factor_authentication || null,
        plan: (user as Record<string, unknown>).plan || null,
      },
      repos: repos.map((r) => ({
        name: r.name,
        full_name: r.full_name,
        description: r.description,
        language: r.language,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        open_issues_count: r.open_issues_count,
        watchers_count: r.watchers_count,
        size: r.size,
        default_branch: r.default_branch,
        topics: r.topics,
        license: r.license,
        created_at: r.created_at,
        updated_at: r.updated_at,
        pushed_at: r.pushed_at,
        homepage: r.homepage,
        fork: r.fork,
        archived: r.archived,
        disabled: r.disabled,
        visibility: r.visibility,
        subscribers_count: r.subscribers_count,
        network_count: r.network_count,
      })),
      orgs: orgs.map((o) => ({
        login: o.login,
        id: o.id,
        avatar_url: o.avatar_url,
        description: o.description,
      })),
      contributions,
      events: events.map((e) => ({
        id: e.id,
        type: e.type,
        created_at: e.created_at,
        repo: { name: (e.repo as { name: string }).name },
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}