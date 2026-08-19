// components/site/sections/chart-view.tsx
"use client";
import { useMemo } from "react";
import { CalendarDays, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface ContributionWeek {
  contributionDays: {
    date: string;
    contributionCount: number;
  }[];
}

interface ChartViewProps {
  weeks?: ContributionWeek[];
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const chartConfig = {
  contributions: {
    label: "Contributions",
    color: "#e11d48",
  },
} satisfies ChartConfig;

function aggregateByMonth(weeks: ContributionWeek[]): {
  data: { month: string; contributions: number }[];
  startYear: number;
  endYear: number;
} {
  const monthly: Record<string, number> = {};

  const allDates = weeks
    .flatMap((w) => w.contributionDays.map((d) => d.date))
    .sort();

  const startDate = allDates.length > 0 ? new Date(allDates[0]) : new Date();
  const endDate =
    allDates.length > 0 ? new Date(allDates[allDates.length - 1]) : new Date();

  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  weeks.forEach((week) => {
    week.contributionDays.forEach((day) => {
      const date = new Date(day.date);
      const monthKey = MONTHS[date.getMonth()];
      monthly[monthKey] = (monthly[monthKey] || 0) + day.contributionCount;
    });
  });

  const startMonth = startDate.getMonth();
  const rotatedMonths = [
    ...MONTHS.slice(startMonth),
    ...MONTHS.slice(0, startMonth),
  ];

  return {
    data: rotatedMonths.map((m) => ({
      month: m,
      contributions: monthly[m] || 0,
    })),
    startYear,
    endYear,
  };
}

export default function ChartView({ weeks }: ChartViewProps) {
  const { chartData, startYear, endYear } = useMemo(() => {
    if (!weeks || weeks.length === 0) {
      const y = new Date().getFullYear();
      return {
        chartData: MONTHS.map((m) => ({ month: m, contributions: 0 })),
        startYear: y,
        endYear: y,
      };
    }
    const result = aggregateByMonth(weeks);
    return {
      chartData: result.data,
      startYear: result.startYear,
      endYear: result.endYear,
    };
  }, [weeks]);

  const peakContributions = useMemo(
    () => Math.max(...chartData.map((d) => d.contributions), 1),
    [chartData],
  );

  const yAxisMax = useMemo(
    () => Math.ceil(peakContributions * 1.5),
    [peakContributions],
  );

  const trendingMonths = useMemo(() => {
    if (chartData.length < 2) return 0;
    const last = chartData[chartData.length - 1].contributions;
    const prev = chartData[chartData.length - 2].contributions;
    if (prev === 0) return last > 0 ? 100 : 0;
    return Math.round(((last - prev) / prev) * 100);
  }, [chartData]);

  const yearLabel =
    startYear === endYear ? `${startYear}` : `${startYear} – ${endYear}`;

  return (
    <div className="flex flex-col w-full h-50">
      <ChartContainer config={chartConfig} className="h-46! w-full">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{ left: 12, right: 12, top: 5, bottom: -5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-rose-500/15!"
          />
          <XAxis
            dataKey="month"
            tickMargin={8}
            tickLine={false}
            axisLine={false}
            stroke="#f43f5e"
            tickFormatter={(value) => value.slice(0, 3)}
            tick={{ fill: "#f43f5e", fontSize: 12 }}
          />
          <YAxis
            domain={[0, yAxisMax]}
            width={25}
            tickMargin={4}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#f43f5e", fontSize: 11 }}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent className="min-w-36!" />}
          />
          <defs>
            <linearGradient id="fillContributions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e11d48" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#e11d48" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            dataKey="contributions"
            type="natural"
            fill="url(#fillContributions)"
            fillOpacity={0.4}
            stroke="#e11d48"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
      <div className="flex items-center justify-between m-auto pl-7 text-[0.65rem] font-medium text-rose-500 py-2 leading-none w-full">
        <div className="flex items-center gap-1 leading-none">
          <CalendarDays className="size-3.5 mb-0.5" />
          <span>{yearLabel}</span>
        </div>
        <p className="flex items-center gap-1.5 leading-none">
          {trendingMonths > 0 ? "Trending up" : "Trending down"} by{" "}
          {Math.abs(trendingMonths)}% this month{" "}
          <TrendingUp
            className={`size-4 ${trendingMonths < 0 ? "rotate-180" : ""}`}
          />
        </p>
      </div>
    </div>
  );
}
