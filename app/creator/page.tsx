// app/creator/page.tsx
"use client";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Loader2,
  Star,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { Heatmap } from "./heatmap";
import { GitHubStats } from "./types";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

// ─── MAIN COMPONENT ────────────────────────────────────────
export default function Creator({ isScreenshot = false }) {
  const [ghStats, setGhStats] = useState<GitHubStats | null>(null);
  const [ghStatsLoading, setGhStatsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentDate(
        new Date().toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      );
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  // ─── FETCH: GitHub Stats ──────────────────────────────────
  useEffect(() => {
    async function fetchGhStats() {
      try {
        const res = await fetch("/api/github-stats");
        if (res.ok) {
          const data = await res.json();
          setGhStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
      } finally {
        setGhStatsLoading(false);
      }
    }
    fetchGhStats();
  }, []);

  // ─── HELPERS ────────────────────────────────────────────────
  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ─── RENDER ──────────────────────────────────────────────────
  return (
    <section
      id="bento-card"
      className={`relative p-5 ${!isScreenshot ? "md:p-10 lg:p-20" : "py-10 max-w-280 m-auto"} bg-foreground/5 w-full`}
    >
      <div className="flex flex-col items-start justify-start text-start bg-background border border-foreground/15 shadow-xl rounded-4xl overflow-hidden max-w-5xl m-auto w-full h-full">
        <div className="flex items-center justify-between px-6 py-4 mx-auto gap-4 text-foreground/60 border-b border-foreground/15 font-medium tracking-wide leading-none w-full">
          <p>thevinayakgore&apos;s contribution heatmap</p>
          <div className="flex items-center gap-5">
            <p className="text-sm">
              {ghStats?.createdAt
                ? `Joined - ${formatDate(ghStats.createdAt)}`
                : "Loading..."}
            </p>
            <Separator
              orientation="vertical"
              className="bg-foreground/30 my-auto h-7"
            />
            <p className="text-sm">{currentDate}</p>
          </div>
        </div>

        {/* Heatmap */}
        <div className="p-5 border-b border-foreground/15 border-dashed w-full">
          {ghStatsLoading ? (
            <div className="flex items-center justify-center p-5">
              <Loader2 className="size-5 animate-spin text-foreground/40" />
            </div>
          ) : ghStats?.heatmapWeeks ? (
            <Heatmap weeks={ghStats.heatmapWeeks} />
          ) : (
            <p className="text-sm text-foreground/40 text-center p-5">
              No contribution data available
            </p>
          )}
        </div>

        {/* Stats Grid */}
        {ghStatsLoading ? (
          <div className="flex items-center justify-center p-5 w-full py-20">
            <Loader2 className="size-8 animate-spin text-foreground/40" />
          </div>
        ) : ghStats ? (
          <div className="grid grid-cols-12 grid-rows-6 w-full">
            {/* Total Stars - col-span-4 */}
            <div className="col-span-4 flex flex-col items-center justify-center p-5 w-full h-full">
              <span className="text-3xl font-bold tracking-tight text-yellow-500">
                {formatNumber(ghStats.totalStars)}
              </span>
              <span className="text-sm text-foreground/70 font-semibold mt-1">
                Total Stars
              </span>
            </div>

            {/* Followers - col-span-4 */}
            <div className="col-span-4 flex flex-col items-center justify-center p-5 border-x border-foreground/15 border-dashed w-full h-full">
              <span className="text-3xl font-bold tracking-tight text-blue-500">
                {formatNumber(ghStats.followers)}
              </span>
              <span className="text-sm text-foreground/70 font-semibold mt-1">
                Followers
              </span>
            </div>

            {/* Public Repos - col-span-4 */}
            <div className="col-span-4 flex flex-col items-center justify-center p-5 w-full h-full">
              <span className="text-3xl font-bold tracking-tight text-green-500">
                {formatNumber(ghStats.publicRepos)}
              </span>
              <span className="text-sm text-foreground/70 font-semibold mt-1">
                Public Repos
              </span>
            </div>

            {/* Total Contributions - col-span-2, row-span-2 */}
            <div className="col-span-4 row-span-2 flex flex-col items-center justify-center p-5 border-y border-foreground/15 border-dashed w-full h-full">
              <span className="text-5xl font-bold tracking-tight text-purple-500">
                {formatNumber(ghStats.totalContributions)}
              </span>
              <span className="text-sm text-foreground/70 font-semibold mt-1">
                Total Contributions
              </span>
              <span className="text-xs text-foreground/50 font-semibold mt-0.5">
                {formatDate(ghStats.createdAt)} – Present
              </span>
            </div>

            {/* Total Commits - col-span-4 */}
            <div className="col-span-4 row-span-2 flex flex-col items-center justify-center p-5 border border-foreground/15 border-dashed w-full h-full">
              <span className="text-5xl font-bold tracking-tight text-cyan-500">
                {formatNumber(ghStats.totalCommits || 0)}
              </span>
              <span className="text-sm text-foreground/70 font-semibold mt-1">
                Total Commits
              </span>
              <span className="text-xs text-foreground/50 font-semibold mt-0.5">
                {formatDate(ghStats.createdAt)} – Present
              </span>
            </div>

            {/* Longest Streak - col-span-4 */}
            <div className="col-span-4 row-span-2 flex flex-col items-center justify-center p-5 border-y border-foreground/15 border-dashed w-full h-full">
              <span className="text-5xl font-bold tracking-tight text-orange-500">
                {ghStats.longestStreak}
              </span>
              <span className="text-sm text-foreground/70 font-semibold mt-1">
                Days Longest Streak
              </span>
            </div>

            {/* Current Streak - col-span-4 */}
            <div className="col-span-3 flex flex-col items-center justify-center p-5 w-full h-full">
              <span className="text-3xl font-bold tracking-tight text-pink-500">
                {ghStats.currentStreak} days
              </span>
              <span className="text-sm text-foreground/70 font-semibold mt-1">
                Current Streak
              </span>
            </div>

            {/* Pull Requests - col-span-4 */}
            <div className="col-span-3 flex flex-col items-center justify-center border-x border-foreground/15 border-dashed p-5 w-full h-full">
              <span className="text-3xl font-bold tracking-tight text-indigo-500">
                {formatNumber(ghStats.totalPullRequests || 0)}
              </span>
              <span className="text-sm text-foreground/70 font-semibold mt-1">
                Pull Requests
              </span>
            </div>

            {/* Issues Opened - col-span-4 */}
            <div className="col-span-3 flex flex-col items-center justify-center border-r border-foreground/15 border-dashed p-5 w-full h-full">
              <span className="text-3xl font-bold tracking-tight text-rose-500">
                {formatNumber(ghStats.totalIssues || 0)}
              </span>
              <span className="text-sm text-foreground/70 font-semibold mt-1">
                Issues Opened
              </span>
            </div>

            {/* Repos Contributed To - col-span-4 */}
            <div className="col-span-3 flex flex-col items-center justify-center p-5 w-full h-full">
              <span className="text-3xl font-bold tracking-tight text-emerald-500">
                {formatNumber(ghStats.contributedRepos || 0)}
              </span>
              <span className="text-sm text-foreground/70 font-semibold mt-1">
                Repos Contributed To
              </span>
            </div>

            {/* Most Starred Project - col-span-2 */}
            <div className="col-span-6 row-span-2 flex flex-col items-center justify-center p-5 border-t border-r border-foreground/15 border-dashed w-full h-full">
              <span className="text-3xl font-bold tracking-tight text-indigo-500 truncate max-w-full">
                {ghStats.mostStarred || "—"}
              </span>
              <span className="text-sm text-foreground/70 font-semibold mt-1">
                Most Starred Project
              </span>
              <span className="flex items-center gap-2 text-5xl font-bold tracking-tight mt-0.5">
                <Star className="size-15 text-yellow-400 fill-yellow-400 -rotate-12" />
                {String(ghStats.mostStarredStars ?? 0).padStart(2, "0")}
              </span>
            </div>

            {/* Top Languages - col-span-3 (full width) */}
            {ghStats.topLanguages && ghStats.topLanguages.length > 0 && (
              <div className="col-span-6 flex flex-col items-start p-5 border-y border-foreground/15 border-dashed w-full">
                <span className="text-lg font-semibold mb-5">
                  Top Languages
                </span>
                <div className="flex flex-wrap gap-2 w-full">
                  {ghStats.topLanguages.map((lang: string) => (
                    <span
                      key={lang}
                      className="px-5 py-2 text-sm tracking-wide font-semibold bg-amber-400 text-black rounded-md"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            <div className="col-span-6 flex items-center justify-center gap-3 p-5 border-t border-foreground/15 border-dashed w-full">
              <Link
                href="https://github.com/thevinayakgore"
                target="_blank"
                className="flex items-center justify-center size-10 bg-foreground/5 hover:bg-sky-500 text-foreground/40 hover:text-white hover:shadow-lg shadow-sky-500/40 hover:scale-110 hover:rotate-6 rounded-md transition-all duration-500"
              >
                <Github className="size-4.5" />
              </Link>

              <Link
                href="https://linkedin.com/in/thevinayakgore"
                target="_blank"
                className="flex items-center justify-center size-10 bg-foreground/5 hover:bg-sky-500 text-foreground/40 hover:text-white hover:shadow-lg shadow-sky-500/40 hover:scale-110 hover:rotate-6 rounded-md transition-all duration-500"
              >
                <Linkedin className="size-4.5" />
              </Link>

              <Link
                href="https://x.com/thevinayakgore"
                target="_blank"
                className="flex items-center justify-center size-10 bg-foreground/5 hover:bg-sky-500 text-foreground/40 hover:text-white hover:shadow-lg shadow-sky-500/40 hover:scale-110 hover:rotate-6 rounded-md transition-all duration-500"
              >
                <Twitter className="size-4.5" />
              </Link>

              <Link
                href="https://instagram.com/thevinayakgore"
                target="_blank"
                className="flex items-center justify-center size-10 bg-foreground/5 hover:bg-sky-500 text-foreground/40 hover:text-white hover:shadow-lg shadow-sky-500/40 hover:scale-110 hover:rotate-6 rounded-md transition-all duration-500"
              >
                <Instagram className="size-4.5" />
              </Link>

              <Link
                href="https://facebook.com/thevinayakgore"
                target="_blank"
                className="flex items-center justify-center size-10 bg-foreground/5 hover:bg-sky-500 text-foreground/40 hover:text-white hover:shadow-lg shadow-sky-500/40 hover:scale-110 hover:rotate-6 rounded-md transition-all duration-500"
              >
                <Facebook className="size-4.5" />
              </Link>

              <Link
                href="https://youtube.com/@thevinayakgore"
                target="_blank"
                className="flex items-center justify-center size-10 bg-foreground/5 hover:bg-sky-500 text-foreground/40 hover:text-white hover:shadow-lg shadow-sky-500/40 hover:scale-110 hover:rotate-6 rounded-md transition-all duration-500"
              >
                <Youtube className="size-4.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-foreground/40 text-center py-10 w-full">
            Unable to load GitHub stats. Please try again later.
          </div>
        )}
      </div>

      {!isScreenshot && (
        <>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-60 bg-linear-to-l from-transparent via-primary to-transparent h-px w-full" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 blur-2xl opacity-20 bg-linear-to-l from-transparent via-primary to-transparent rounded-full h-20 w-full" />
        </>
      )}
    </section>
  );
}
