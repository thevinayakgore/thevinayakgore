// app/creator/page.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import ChartView from "./chart-view";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { formatCount } from "@/utils/format-count";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type {
  GitHubUser,
  GitHubRepo,
  ContributionWeek,
  ContributionStats,
  GridData,
} from "@/types/bento-card";
import {
  computeTotalStars,
  computeTotalForks,
  computeTopLanguages,
} from "@/utils/bento-card";
import { getDailyQuote } from "@/utils/quotes";

// ── API functions ────────────────────────────────────────
const USERNAME = "thevinayakgore";

async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
}

async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
  );
  if (!res.ok) throw new Error("Failed to fetch repos");
  return res.json();
}

async function fetchContributionStats(
  username: string,
): Promise<ContributionStats> {
  const res = await fetch(`/api/github/contributions?username=${username}`);
  if (!res.ok) throw new Error("Failed to fetch contribution stats");
  const json = await res.json();
  const collection = json.data?.user?.contributionsCollection;
  if (!collection) throw new Error("No contribution data");

  const totalContributions: number =
    collection.contributionCalendar.totalContributions;
  const totalCommits: number = collection.totalCommitContributions || 0;
  const totalPRs: number = collection.totalPullRequestContributions || 0;
  const totalIssues: number = collection.totalIssueContributions || 0;
  const weeks: ContributionWeek[] = collection.contributionCalendar.weeks;

  const days = weeks
    .flatMap((w) => w.contributionDays)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];
  const dayMap = new Map<string, number>();
  days.forEach((d) => dayMap.set(d.date, d.contributionCount));

  let currentStreak = 0;
  const checkDate = new Date(now);
  checkDate.setDate(checkDate.getDate() - 1);

  while (true) {
    const dateStr = checkDate.toISOString().split("T")[0];
    const count = dayMap.get(dateStr) ?? 0;
    if (count > 0) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  const todayCount = dayMap.get(todayStr) ?? 0;
  if (todayCount > 0 && currentStreak === 0) {
    currentStreak = 1;
    checkDate.setDate(checkDate.getDate() - 1);
    while (true) {
      const dateStr = checkDate.toISOString().split("T")[0];
      const count = dayMap.get(dateStr) ?? 0;
      if (count > 0) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  } else if (todayCount > 0) {
    currentStreak++;
  }

  let longestStreak = 0;
  let tempStreak = 0;
  for (let i = 0; i < days.length; i++) {
    if (days[i].contributionCount > 0) {
      tempStreak++;
    } else {
      if (tempStreak > longestStreak) longestStreak = tempStreak;
      tempStreak = 0;
    }
  }
  if (tempStreak > longestStreak) longestStreak = tempStreak;

  return {
    totalContributions,
    totalCommits,
    totalPRs,
    totalIssues,
    currentStreak,
    longestStreak,
    weeks,
  };
}

// ── Heatmap ──────────────────────────────────────────────
function Heatmap({ weeks }: { weeks: ContributionWeek[] }) {
  const maxContributions = useMemo(
    () =>
      Math.max(
        ...weeks.flatMap((w) =>
          w.contributionDays.map((d) => d.contributionCount),
        ),
        1,
      ),
    [weeks],
  );

  const getColor = useCallback(
    (count: number) => {
      if (count === 0) return "bg-blue-600/20";
      const ratio = count / maxContributions;
      if (ratio > 0.75) return "bg-blue-600";
      if (ratio > 0.5) return "bg-blue-600/80";
      if (ratio > 0.25) return "bg-blue-600/60";
      return "bg-blue-600/50";
    },
    [maxContributions],
  );

  return (
    <div className="relative z-30 mt-4 flex gap-0.75 overflow-hidden">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-0.75">
          {week.contributionDays.map((day, di) => (
            <Tooltip key={di}>
              <TooltipTrigger>
                <div
                  className={`size-3.25 cursor-pointer rounded-xs ${getColor(day.contributionCount)}`}
                />
              </TooltipTrigger>
              <TooltipContent className="text-xs font-semibold px-2.5 py-1.5">
                <p>{formatCount(day.contributionCount)} Contributions</p>
                <Separator orientation="vertical" className="bg-secondary/30" />
                <p>
                  {new Date(day.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Placeholder ──────────────────────────────────────────
function PlaceholderBox({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-full w-full text-3xl text-foreground/15 tracking-tight font-medium">
      {label}
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────
export default function Creator() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GridData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [user, repos, stats] = await Promise.all([
          fetchGitHubUser(USERNAME),
          fetchRepos(USERNAME),
          fetchContributionStats(USERNAME),
        ]);
        setData({ user, repos, stats });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalStars = useMemo(
    () => (data ? computeTotalStars(data.repos) : 0),
    [data],
  );
  const totalForks = useMemo(
    () => (data ? computeTotalForks(data.repos) : 0),
    [data],
  );
  const topLanguages = useMemo(
    () => (data ? computeTopLanguages(data.repos) : []),
    [data],
  );

  if (loading) {
    return (
      <section
        id="bento-card"
        className="relative p-5 md:p-10 lg:p-20 bg-foreground/5 w-full"
      >
        <div className="flex items-center justify-center min-h-150">
          <Loader2 className="size-8 animate-spin text-foreground/40" />
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section
        id="bento-card"
        className="relative p-5 md:p-10 lg:p-20 bg-foreground/5 w-full"
      >
        <div className="flex items-center justify-center min-h-150 text-foreground/40">
          Failed to load data
        </div>
      </section>
    );
  }

  const { user, stats } = data;

  return (
    <section id="bento-card" className="p-5 md:p-10 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 max-w-6xl mx-auto">
        {/* Name */}
        <div
          className="relative group flex flex-col items-center justify-center gap-3 p-3 border rounded-2xl overflow-hidden min-h-45 bg-card/50"
          style={{ gridColumn: "span 1", gridRow: "span 5" }}
        >
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-center px-3 py-2 whitespace-nowrap bg-blue-600 text-white leading-none! rounded-lg w-fit">
            <p className="text-base tracking-tight font-medium leading-none!">
              {data?.user.name || data?.user.login || "Your Name"}
            </p>
            <Link
              href={data ? `https://github.com/${data.user.login}` : "#"}
              className="text-xs opacity-70 font-medium w-fit"
            >
              @{data?.user.login || "username"}
            </Link>
          </div>
          <Image
            src="/vinu.jpeg"
            alt="Profile"
            width={2000}
            height={2000}
            priority
            unoptimized
            loading="eager"
            className="absolute inset-0 z-0 object-cover h-full w-full"
          />
        </div>

        {/* Cover Image */}
        <div
          className="relative border rounded-2xl overflow-hidden min-h-45"
          style={{ gridColumn: "span 2", gridRow: "span 6" }}
        >
          <Image
            src="/cover.png"
            alt="Cover"
            width={2000}
            height={2000}
            loading="eager"
            unoptimized
            className="object-cover h-full w-full"
          />
          <p className="absolute inset-x-0 bottom-0 left-0 z-50 text-sm font-medium flex flex-col px-4 py-3 mt-auto bg-white/10 backdrop-blur-md text-white w-full">
            {data?.user.bio || "Your bio will appear here."}
          </p>
        </div>

        {/* Total Stars */}
        <div
          className="relative flex flex-col items-center justify-center gap-2 bg-linear-to-tl from-yellow-400 via-yellow-400/30 rounded-2xl overflow-hidden min-h-45"
          style={{ gridColumn: "span 1", gridRow: "span 3" }}
        >
          <Image
            src="/assets/star2.png"
            alt=""
            width={1000}
            height={1000}
            priority
            unoptimized
            loading="eager"
            className="absolute -bottom-30 -right-15 scale-110"
          />
          <div className="absolute top-5 left-5 text-white text-shadow-lg/10 z-30">
            <p className="text-7xl tracking-tighter leading-none font-bold">
              {formatCount(totalStars)}
            </p>
            <p className="text-4xl tracking-tighter font-semibold leading-none">
              Total Stars
            </p>
          </div>
        </div>

        {/* PRs */}
        <div
          className="relative flex flex-col items-center justify-center text-green-500 rounded-2xl min-h-45 overflow-hidden"
          style={{ gridColumn: "span 1", gridRow: "span 3" }}
        >
          <Image
            src="/assets/waves.jpg"
            alt=""
            width={500}
            height={500}
            priority
            unoptimized
            loading="eager"
            className="object-cover absolute inset-0 scale-150 w-full h-full"
          />
          <div className="absolute bottom-3 right-6 text-end text-shadow-lg text-shadow-black/80!">
            <p className="text-9xl font-extrabold tracking-tighter leading-none -mb-2">
              {formatCount(stats.totalPRs)}
            </p>
            <p className="text-4xl font-semibold tracking-tight leading-none">
              GitHub PRs
            </p>
          </div>
        </div>

        {/* Website */}
        <div
          className="relative flex flex-col items-center justify-center gap-2 bg-linear-to-br from-orange-600 rounded-2xl overflow-hidden min-h-45"
          style={{ gridColumn: "span 1", gridRow: "span 3" }}
        >
          <Image
            src="/assets/earth.png"
            alt=""
            width={500}
            height={500}
            priority
            unoptimized
            loading="eager"
            className="object-cover object-top mt-30 scale-150 absolute inset-0 w-full h-full"
          />
          <Link
            href={user.blog || "https://tvg.venumity.com"}
            target="_blank"
            className="absolute top-12 left-1/2 -translate-x-1/2 z-30 px-5 py-2 bg-white/10 backdrop-blur-sm text-white shadow-lg/15 text-2xl font-semibold truncate rounded-full max-w-full"
          >
            {user.blog
              ? user.blog.replace(/^https?:\/\//, "")
              : "tvg.venumity.com"}
          </Link>
        </div>

        {/* Chart */}
        <div
          className="flex flex-col items-center p-4 bg-linear-to-br from-rose-500/30 via-background to-rose-500/30 rounded-2xl w-full"
          style={{ gridColumn: "span 2", gridRow: "span 3" }}
        >
          <ChartView weeks={stats.weeks} />
        </div>

        {/* Twitter */}
        <div
          className="relative flex flex-col items-center justify-center gap-2 rounded-2xl overflow-hidden min-h-45"
          style={{ gridColumn: "span 1", gridRow: "span 3" }}
        >
          <Image
            src="/assets/twitter.jpg"
            alt=""
            width={500}
            height={500}
            priority
            unoptimized
            loading="eager"
            className="object-cover object-top scale-300 absolute inset-0 w-full h-full"
          />
          <Link
            href={`https://x.com/${user.twitter_username || ""}`}
            target="_blank"
            className="absolute top-2/3 left-1/2 -translate-y-2/3 -translate-x-1/2 z-30 p-3 text-2xl text-white font-semibold text-shadow-lg text-shadow-black/15 tracking-tight truncate"
          >
            @{user.twitter_username || "thevinayakgore"}
          </Link>
        </div>

        {/* Current Streak */}
        <div
          className="relative flex flex-col items-center justify-center rounded-2xl overflow-hidden min-h-45"
          style={{ gridColumn: "span 1", gridRow: "span 4" }}
        >
          <Image
            src="/assets/current-streak.png"
            alt=""
            width={1000}
            height={1000}
            priority
            unoptimized
            loading="eager"
            className="object-cover object-left absolute inset-0 scale-130 w-full h-full"
          />
          <div className="z-30 text-end">
            <p className="absolute top-0 right-5 text-black text-shadow-lg text-shadow-black/10 text-8xl font-bold tracking-tighter -mb-2">
              {formatCount(stats.currentStreak)}
            </p>
            <p className="absolute bottom-5 right-8 text-white text-shadow-lg text-shadow-black/20 text-4xl font-bold leading-9 tracking-tighter">
              Current
              <br />
              Streak
            </p>
          </div>
        </div>

        {/* Public Repos */}
        <div
          className="relative flex flex-col items-center justify-center border rounded-2xl overflow-hidden min-h-45"
          style={{ gridColumn: "span 1", gridRow: "span 3" }}
        >
          <Image
            src="/assets/repository.png"
            alt=""
            width={1000}
            height={1000}
            priority
            unoptimized
            loading="eager"
            className="object-cover object-bottom-left absolute inset-0 scale-130 w-full h-full"
          />
          <div className="absolute bottom-3 left-3 text-start z-30 text-white text-shadow-lg text-shadow-black/30">
            <p className="text-8xl leading-none font-bold tracking-tighter -mb-1">
              {formatCount(user.public_repos)}
            </p>
            <p className="text-3xl font-bold tracking-tight leading-none">
              Repositories
            </p>
          </div>
        </div>

        {/* Longest Streak */}
        <div
          className="relative flex flex-col items-start justify-center rounded-2xl overflow-hidden min-h-45"
          style={{ gridColumn: "span 2", gridRow: "span 3" }}
        >
          <Image
            src="/assets/longest-streak4.png"
            alt=""
            width={1000}
            height={1000}
            priority
            unoptimized
            loading="eager"
            className="object-cover object-top-left absolute inset-0 scale-115 w-full h-full"
          />
          <p className="absolute top-4 right-5 z-30 text-base text-center text-white/90 leading-none tracking-widest whitespace-nowrap w-fit">
            Longest Contribution Streak From GitHub Journey
          </p>
          <p className="absolute top-3 right-1/3 translate-x-1/3 z-30 p-5 text-center text-white text-shadow-lg text-shadow-black/25 text-9xl leading-none font-bold tracking-tighter">
            {formatCount(stats.longestStreak)}
          </p>
        </div>

        {/* Heatmap */}
        <div
          className="relative flex flex-col items-center justify-center m-auto p-2 bg-linear-to-br from-blue-600/40 to-blue-600/10 rounded-2xl overflow-hidden w-full min-h-45"
          style={{ gridColumn: "span 3", gridRow: "span 3" }}
        >
          <span className="absolute top-3 left-1/2 -translate-x-1/2 z-0 text-white text-xl whitespace-nowrap font-medium tracking-tight leading-none text-shadow-lg text-shadow-black/8">
            Contribution Heatmap
          </span>
          {stats.weeks ? (
            <Heatmap weeks={stats.weeks} />
          ) : (
            <PlaceholderBox label="Heatmap" />
          )}
        </div>

        {/* Total Contributions */}
        <div
          className="relative flex flex-col items-start justify-end border rounded-2xl overflow-hidden min-h-45"
          style={{ gridColumn: "span 1", gridRow: "span 6" }}
        >
          <Image
            src="/assets/contribution.png"
            alt=""
            width={1000}
            height={1000}
            priority
            unoptimized
            loading="eager"
            className="object-cover object-left absolute inset-0 scale-120 w-full h-full"
          />
          <div className="p-5 z-30 text-white text-shadow-lg text-shadow-black/30 tracking-tighter">
            <p className="text-8xl font-bold leading-none tracking-tighter">
              {formatCount(stats.totalContributions)}
            </p>
            <p className="text-4xl font-semibold leading-none">Contributions</p>
          </div>
        </div>

        {/* Company */}
        <div
          className="relative flex flex-col items-center justify-center p-5 md:p-10 border rounded-2xl overflow-hidden min-h-45"
          style={{ gridColumn: "span 1", gridRow: "span 6" }}
        >
          <Image
            src="/assets/setup.avif"
            alt=""
            width={1000}
            height={1000}
            priority
            unoptimized
            loading="eager"
            className="object-cover absolute inset-0 scale-140 w-full h-full"
          />
          {user.company ? (
            <div className="flex flex-wrap items-center justify-center gap-5 z-30 w-full">
              {user.company
                .split(/\s+/)
                .map((c) => c.trim())
                .filter(Boolean)
                .slice(0, 5)
                .map((company: string) => (
                  <p
                    key={company}
                    className="stackSans px-5 py-3 text-center ring-white bg-white/10 backdrop-blur-md shadow-2xl shadow-black/30 text-2xl tracking-tight text-white text-shadow-lg text-shadow-black/10 ring-4 rounded-full w-full"
                  >
                    {company}
                  </p>
                ))}
            </div>
          ) : (
            <p className="stackSans z-30 px-5 py-3 bg-black/5 backdrop-blur-lg ring-4 ring-white inset-shadow-sm inset-shadow-black/40 shadow-2xl shadow-black text-4xl tracking-tighter font-bold text-white text-shadow-lg text-shadow-black/10 rounded-full">
              Company
            </p>
          )}
        </div>

        {/* Top Languages */}
        <div
          className="relative flex flex-col justify-center p-5 md:p-10 bg-background ring-3 ring-foreground/15 border-5 border-background rounded-2xl overflow-hidden max-h-45"
          style={{ gridColumn: "span 2", gridRow: "span 3" }}
        >
          <div className="relative z-20 flex flex-wrap items-center justify-center m-auto gap-5 pr-5 w-full h-fit">
            {topLanguages.length > 0 ? (
              topLanguages.map((lang) => (
                <div
                  key={lang.name}
                  className="relative flex flex-col items-center gap-2 font-medium"
                >
                  <p
                    className={`relative z-30 px-5 py-1 text-xl text-white ${lang.color} ring-3 border border-background text-shadow-lg text-shadow-black/10 rounded-full w-fit`}
                  >
                    {lang.name}
                  </p>
                  <p className="relative z-30 text-lg text-foreground/50">
                    {formatCount(lang.count)} repos
                  </p>
                </div>
              ))
            ) : (
              <PlaceholderBox label="Top Languages" />
            )}
          </div>
          <p className="absolute top-1/2 -translate-y-1/2 -right-8 z-20 text-center text-2xl font-smeibold -rotate-90 opacity-50 tracking-tight w-fit h-fit">
            Languages
          </p>
          <div className="absolute inset-0 scale-150 opacity-80 overflow-hidden">
            <div
              className={cn(
                "absolute inset-0 w-[250%] h-[250%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "bg-size-[2px_2px]",
                "bg-[linear-gradient(to_right,#e4e4e7_0.7px,transparent_0.7px),linear-gradient(to_bottom,#e4e4e7_0.7px,transparent_0.7px)]",
                "dark:bg-[linear-gradient(to_right,#262626_0.7px,transparent_0.7px),linear-gradient(to_bottom,#262626_0.7px,transparent_0.7px)]",
                "rotate-45 scale-[1.5]",
              )}
            />
          </div>
        </div>

        {/* Commits */}
        <div
          className="relative flex flex-col items-center justify-center rounded-2xl overflow-hidden min-h-45"
          style={{ gridColumn: "span 1", gridRow: "span 3" }}
        >
          <Image
            src="/assets/waves.avif"
            alt=""
            width={1000}
            height={1000}
            priority
            unoptimized
            loading="eager"
            className="object-cover absolute inset-0 -left-5 scale-200 w-full h-full"
          />
          <div className="absolute top-5 right-8 text-end z-30 text-white text-shadow-lg text-shadow-black/20">
            <p className="text-7xl leading-none font-bold tracking-tighter">
              {formatCount(stats.totalCommits)}
            </p>
            <p className="text-4xl font-semibold tracking-tighter leading-none">
              Commits
            </p>
          </div>
        </div>

        {/* Forks */}
        <div
          className="relative flex flex-col items-center justify-center gap-2 text-white rounded-2xl min-h-45 overflow-hidden"
          style={{ gridColumn: "span 1", gridRow: "span 3" }}
        >
          <Image
            src="/assets/fork.png"
            alt=""
            width={500}
            height={500}
            priority
            unoptimized
            loading="eager"
            className="absolute inset-0 bg-indigo-500/40 scale-150 w-full"
          />
          <div className="absolute top-1/2 left-1/2 z-30 -translate-y-1/2 -translate-x-1/2 text-center">
            <p className="text-3xl tracking-tighter font-bold leading-none">
              Forks
            </p>
            <p className="text-8xl font-extrabold tracking-tighter leading-none text-shadow-lg text-shadow-black/20">
              {formatCount(totalForks)}
            </p>
          </div>
        </div>

        {/* Open Issues */}
        <div
          className="relative flex items-center justify-center border rounded-2xl overflow-hidden min-h-45 max-h-45"
          style={{ gridColumn: "span 1", gridRow: "span 3" }}
        >
          <Image
            src="/assets/issues.png"
            alt=""
            width={1000}
            height={1000}
            priority
            unoptimized
            loading="eager"
            className="absolute inset-0 scale-120 brightness-80 w-full h-full"
          />
          <div className="absolute bottom-5 right-5 text-end z-30 text-white text-shadow-lg text-shadow-black/30 w-fit">
            <p className="text-8xl leading-none font-extrabold tracking-tighter -mb-2">
              {formatCount(stats.totalIssues)}
            </p>
            <p className="text-4xl tracking-tighter font-semibold leading-none">
              Open Issues
            </p>
          </div>
        </div>

        {/* Followers / Following */}
        <div
          className="relative flex items-center justify-center gap-6 rounded-2xl overflow-hidden min-h-45 max-h-45"
          style={{ gridColumn: "span 1", gridRow: "span 3" }}
        >
          <Image
            src="/assets/following.avif"
            alt=""
            width={1000}
            height={1000}
            priority
            unoptimized
            loading="eager"
            className="object-cover absolute inset-0 scale-110 w-full h-full"
          />
          <div className="text-center z-30 text-white text-shadow-lg text-shadow-black/15 w-fit">
            <p className="text-6xl leading-none font-bold tracking-tighter">
              {formatCount(user.followers)}
            </p>
            <p className="text-xl font-semibold leading-none">Followers</p>
          </div>
          <Separator
            orientation="vertical"
            className="z-30 mx-2 bg-white/20 h-20 my-auto"
          />
          <div className="text-center z-30 text-white text-shadow-lg text-shadow-black/15 w-fit">
            <p className="text-6xl leading-none font-bold tracking-tighter">
              {formatCount(user.following)}
            </p>
            <p className="text-xl font-semibold leading-none">Following</p>
          </div>
        </div>

        {/* Daily Quotes */}
        <div
          className="relative flex flex-col items-center justify-center p-5 text-center bg-foreground/5 ring-4 ring-foreground/10 border-5 border-background rounded-2xl overflow-hidden min-h-45"
          style={{ gridColumn: "span 3", gridRow: "span 3" }}
        >
          {(() => {
            const quote = getDailyQuote();
            return (
              <div className="flex flex-col items-start justify-start text-start ml-3 w-full">
                <h3 className="text-3xl tracking-tighter leading-relaxed">
                  &ldquo;{quote.item}&rdquo;
                </h3>
                <p className="text-xl text-foreground/50 tracking-tight">
                  &ldquo;{quote.mean}&rdquo;
                </p>
                <div className="flex items-center gap-5 ml-auto mt-5">
                  <span className="text-xl leading-none">
                    ✨ {quote.author}
                  </span>
                  <span className="capitalize px-4 py-1 bg-foreground/10 backdrop-blur-md font-semibold rounded-full">
                    {quote.category}
                  </span>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
