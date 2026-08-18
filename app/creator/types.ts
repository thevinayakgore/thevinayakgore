// app/creator/types.ts
export type GitHubStats = {
  totalStars: number;
  followers: number;
  publicRepos: number;
  totalContributions: number;
  longestStreak: number;
  currentStreak: number;
  mostStarred: string;
  mostStarredStars: number;
  createdAt: string;
  topLanguages: string[];
  openSourceProjects: number;
  totalCommits: number;
  totalPullRequests: number;
  totalIssues: number;
  contributedRepos: number;
  heatmapWeeks: {
    contributionDays: {
      contributionCount: number;
      date: string;
    }[];
  }[];
};