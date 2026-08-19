// types/bento-card.ts

// ── GitHub User ──────────────────────────────────────────
export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  blog: string | null;
  twitter_username: string | null;
  location: string | null;  // ✅ Added this
  followers: number;
  following: number;
  public_repos: number;
}

// ── GitHub Repo ──────────────────────────────────────────
export interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

// ── Contribution Types ───────────────────────────────────
export interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionStats {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  weeks: ContributionWeek[];
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
}

// ── Grid Data (runtime) ──────────────────────────────────
export interface GridData {
  user: GitHubUser;
  repos: GitHubRepo[];
  stats: ContributionStats;
}

// ── Top Language ─────────────────────────────────────────
export interface LanguageEntry {
  name: string;
  count: number;
  color: string;
}