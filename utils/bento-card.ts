// utils/bento-card.ts
import type { GitHubRepo, LanguageEntry } from "@/types/bento-card";

export function computeTotalStars(repos: GitHubRepo[]): number {
  return repos.reduce((sum, r) => sum + r.stargazers_count, 0);
}

export function computeTotalForks(repos: GitHubRepo[]): number {
  return repos.reduce((sum, r) => sum + r.forks_count, 0);
}

export function computeTopLanguages(repos: GitHubRepo[]): LanguageEntry[] {
  const langCount: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
  });
  const colors = [
    "bg-linear-to-tl from-emerald-700 to-emerald-400 ring-emerald-500",
    "bg-linear-to-tl from-blue-700 to-blue-400 ring-blue-500",
    "bg-linear-to-tl from-amber-600 to-yellow-300 ring-yellow-400",
  ];
  return Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, count], i) => ({ name, count, color: colors[i] || "" }));
}