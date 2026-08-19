// app/api/github/contributions/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");
  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Server misconfiguration: GITHUB_TOKEN not set" },
      { status: 500 },
    );
  }

  const query = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables: { username } }),
  });

  const json = await res.json();

  // If GitHub returns errors, pass them through
  if (json.errors) {
    return NextResponse.json(
      { error: json.errors[0]?.message || "GitHub API error" },
      { status: res.status },
    );
  }

  return NextResponse.json(json, { status: res.status });
}
