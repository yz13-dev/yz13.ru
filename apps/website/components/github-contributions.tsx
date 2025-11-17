"use client";

import {
  transformData,
  type Activity,
  type ApiErrorResponse,
  type ApiResponse,
  type Year,
} from "@/utils/github-contributions";
import { Tooltip, TooltipContent, TooltipTrigger } from "@yz13/ui/tooltip";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import Calendar, {
  Skeleton,
  type Props as ActivityCalendarProps,
  type ThemeInput,
} from "react-activity-calendar";

const gitHubTheme = {
  light: ["#ffffff", "#d3d3d3", "#a9a9a9", "#808080", "#000000"],
  dark: ["#000000", "#1a1a1a", "#333333", "#666666", "#ffffff"],
} satisfies ThemeInput;

const labels = {
  months: [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ],
  weekdays: [
    "Вс", // Воскресенье первым!
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб",
  ],
  totalCount: "За последний год - {{count}} активностей",
  legend: {
    less: "Меньше",
    more: "Больше",
  },
} satisfies ActivityCalendarProps["labels"];

export type Props = {
  username: string;
  errorMessage?: string;
  throwOnError?: boolean;
  transformData?: (data: Array<Activity>) => Array<Activity>;
  transformTotalCount?: boolean;
  year?: Year;
} & Omit<ActivityCalendarProps, "data">;

const BLOCK_SIZE = 12;
const BLOCK_RADIUS = 2;

export default function GithubContributions({
  username,
  year = "last",
  transformData: transformFn,
  transformTotalCount = true,
  blockSize = BLOCK_SIZE,
  blockRadius = BLOCK_RADIUS,
  throwOnError = false,
  errorMessage = `Error – Fetching GitHub contribution data for "${username}" failed.`,
  ...props
}: Props) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { theme, systemTheme } = useTheme()

  console.log("theme", theme)

  const ref = useRef<HTMLDivElement>(null);

  const totalCount =
    year === "last"
      ? data
        ? data.total.lastYear
        : 0
      : data
        ? data.total[year]
        : 0;

  async function fetchCalendarData(
    username: string,
    year: Year,
  ): Promise<ApiResponse> {
    try {
      const apiUrl = "https://github-contributions-api.jogruber.de/v4/";
      const response = await fetch(`${apiUrl}${username}?y=${String(year)}`);
      console.log("url", `${apiUrl}${username}?y=${String(year)}`)
      const data = (await response.json()) as ApiResponse | ApiErrorResponse;

      if (!response.ok) {
        throw Error(
          `Fetching GitHub contribution data for "${username}" failed: ${(data as ApiErrorResponse).error}`,
        );
      }

      return data as ApiResponse;
    } catch (error) {
      console.error(error);
      return {
        contributions: [],
        total: {
          lastYear: 0,
        },
      };
    }
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchCalendarData(username, year);
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      scroll();
    }
  };

  const contributions = data?.contributions ?? [];

  const calendar = transformData(contributions, transformFn) ?? [];

  const scroll = () => {
    const div = document.querySelector(
      ".react-activity-calendar__scroll-container",
    );
    if (div) {
      const width = div.scrollWidth;
      setTimeout(() => {
        div.scrollTo({ left: width, behavior: "instant" });
      }, 25);
    }
  };

  useEffect(() => {
    if (loading) return;

    scroll();
  }, [loading]);
  useEffect(() => {
    fetchData();
  }, [username, year]);

  if (loading)
    return (
      <Skeleton
        loading
        labels={labels}
        blockSize={blockSize}
        blockRadius={blockRadius}
      />
    );
  return (
    <Calendar
      {...props}
      ref={ref}
      data={calendar}
      labels={labels}
      blockSize={blockSize}
      blockRadius={blockRadius}
      showWeekdayLabels={["mon", "fri"]}
      totalCount={transformFn && transformTotalCount ? undefined : totalCount}
      weekStart={0}
      colorScheme={theme === "system" ? systemTheme : theme as "light" | "dark"}
      theme={gitHubTheme}
      maxLevel={4}
      renderBlock={(block, activity) => {
        const date = new Date(activity.date);
        return (
          <Tooltip>
            <TooltipTrigger asChild>{block}</TooltipTrigger>
            <TooltipContent side="left">
              {activity.count} активностей{" "}
              {format(date, "dd MMMM yyyy", { locale: ru })}
            </TooltipContent>
          </Tooltip>
        );
      }}
    />
  );
}
