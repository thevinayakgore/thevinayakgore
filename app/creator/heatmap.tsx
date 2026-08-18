// app/creator/heatmap.tsx
"use client";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type ContributionDay = {
  contributionCount: number;
  date: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

interface ContributionHeatmapProps {
  weeks: ContributionWeek[];
  className?: string;
}

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

function getContributionLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

function getLevelColor(level: number): string {
  const colors = [
    "bg-zinc-200 dark:bg-zinc-800", // 0
    "bg-green-200 dark:bg-green-900", // 1
    "bg-green-300 dark:bg-green-700", // 2
    "bg-green-500 dark:bg-green-500", // 3
    "bg-green-600 dark:bg-green-300", // 4
  ];
  return colors[level] || colors[0];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Generate ALL days for 2026
function generateYearCells(): { date: Date; count: number }[] {
  const targetYear = 2026;
  const start = new Date(targetYear, 0, 1);
  const end = new Date(targetYear, 11, 31, 23, 59, 59, 999);

  const cells: { date: Date; count: number }[] = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    cells.push({
      date: new Date(cursor),
      count: 0,
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  return cells;
}

// Group into continuous weeks (like GitHub)
function groupIntoContinuousWeeks(cells: { date: Date; count: number }[]): {
  weeks: ({ date: Date; count: number } | null)[][];
  monthPositions: {
    monthIndex: number;
    monthName: string;
    weekIndex: number;
  }[];
} {
  const firstDayOfWeek = cells[0].date.getDay();
  const paddedCells: ({ date: Date; count: number } | null)[] = [];

  // Pad beginning of year with empty cells
  for (let i = 0; i < firstDayOfWeek; i++) {
    paddedCells.push(null);
  }

  cells.forEach((cell) => paddedCells.push(cell));

  const weeks: ({ date: Date; count: number } | null)[][] = [];
  let currentWeek: ({ date: Date; count: number } | null)[] = [];

  paddedCells.forEach((cell) => {
    currentWeek.push(cell);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Add remaining cells if any
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Track month positions
  const monthPositions: {
    monthIndex: number;
    monthName: string;
    weekIndex: number;
  }[] = [];
  let lastMonthIndex = -1;

  weeks.forEach((week, weekIndex) => {
    const firstValidDay = week.find((day) => day !== null);
    if (firstValidDay && firstValidDay.date.getMonth() !== lastMonthIndex) {
      lastMonthIndex = firstValidDay.date.getMonth();
      monthPositions.push({
        monthIndex: lastMonthIndex,
        monthName: firstValidDay.date.toLocaleString("default", {
          month: "short",
        }),
        weekIndex,
      });
    }
  });

  return { weeks, monthPositions };
}

export function Heatmap({
  weeks: propWeeks,
  className,
}: ContributionHeatmapProps) {
  // Generate all days for 2026
  const allDays = generateYearCells();

  // Create map of contributions
  const contributionMap = new Map<string, number>();
  propWeeks.forEach((week) => {
    week.contributionDays.forEach((day) => {
      const date = new Date(day.date);
      if (date.getFullYear() === 2026) {
        contributionMap.set(day.date, day.contributionCount);
      }
    });
  });

  // Merge contributions into all days
  const mergedDays = allDays.map((day) => {
    const dateStr = getLocalDateString(day.date);
    const count = contributionMap.get(dateStr) || 0;
    return {
      date: day.date,
      count,
    };
  });

  // Group into continuous weeks
  const { weeks, monthPositions } = groupIntoContinuousWeeks(mergedDays);

  if (weeks.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        No contribution data available for 2026
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className="flex w-full">
        {/* Weekday labels - STICKY */}
        <div className="sticky left-0 top-0 z-20 pt-5.5 pr-2 flex flex-col bg-background/80 backdrop-blur-sm text-sm font-mono text-foreground/50">
          {DAYS.map((label, i) => (
            <span key={i} className="leading-4.75 flex items-center">
              {label}
            </span>
          ))}
        </div>

        {/* Heatmap grid - CONTINUOUS FLOW */}
        <div className="flex flex-col gap-2.5 pl-0.5 pr-2.5 overflow-auto w-full">
          {/* Month labels row with absolute positioning */}
          <div className="flex text-sm tracking-wide font-semibold uppercase text-foreground/50 h-4.5 relative">
            {monthPositions.map((month) => {
              const leftPosition = month.weekIndex * 18; // 12px (cell) + 2px (gap) = 18px per week
              return (
                <div
                  key={month.monthIndex}
                  className="absolute"
                  style={{ left: `${leftPosition}px` }}
                >
                  {month.monthName}
                </div>
              );
            })}
            {/* Spacer for proper width */}
            <div style={{ width: `${weeks.length * 18}px`, height: "1px" }} />
          </div>

          {/* Continuous weeks grid - NO GAP between months */}
          <div className="flex gap-0.75">
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-0.75">
                {week.map((day, dayIdx) => {
                  if (day === null) {
                    return (
                      <div
                        key={`${weekIdx}-${dayIdx}`}
                        className="size-3.75 rounded-xs bg-transparent"
                      />
                    );
                  }

                  const level = getContributionLevel(day.count);
                  const color = getLevelColor(level);
                  const dateStr = getLocalDateString(day.date);

                  return (
                    <HoverCard key={`${weekIdx}-${dayIdx}`}>
                      <HoverCardTrigger>
                        <div
                          className={cn(
                            "size-3.75 rounded-xs transition-colors cursor-pointer",
                            color,
                          )}
                        />
                      </HoverCardTrigger>
                      <HoverCardContent
                        className="text-xs py-1.5 px-2 bg-popover border border-foreground/15 rounded-md font-bold w-auto"
                        side="top"
                        align="center"
                      >
                        <p>
                          <span>{day.count > 0 ? day.count : "No"}</span>{" "}
                          contribution
                          {day.count !== 1 ? "s" : ""}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {formatDate(dateStr)}
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
