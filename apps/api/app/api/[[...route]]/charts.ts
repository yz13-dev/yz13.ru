import { redis } from "@/extensions/redis";
import dayjs from "dayjs";
import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const charts = new Hono();

type GroupOptions = {
  format?: string;
};
const groupViewsChartData = (chartData: any[], options?: GroupOptions) => {
  const { format = "YYYY-MM-DD" } = options || {};
  const data: any[] = [];
  const labels: string[] = [];

  chartData.forEach((d) => {
    const date = dayjs(d.created_at).format(format);
    if (!labels.includes(date)) {
      labels.push(date);
    }
  });

  labels.forEach((l) => {
    const count = chartData.filter(
      (d) => dayjs(d.created_at).format(format) === l,
    ).length;
    data.push({ label: l, count });
  });

  return { data, labels };
};

charts.get("/views", async (c) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const current_date = dayjs();
  const week_start = current_date.set("day", 1).format();
  const week_end = current_date.set("day", 7).format();

  const { data, error } = await supabase
    .from("visitor-session")
    .select("id, created_at, user_id")
    .gte("created_at", week_start)
    .lte("created_at", week_end);

  if (error) return c.json({ data: null, error });

  const chart = groupViewsChartData(data);

  return c.json({
    range_start: week_start,
    range_end: week_end,
    chart,
    error: null,
  });
});

charts.get("/views/half-year", async (c) => {
  const cache = await redis.get("views/half-year");

  if (cache) return c.json(cache);

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const current_date = dayjs();
  const range_start = current_date
    .subtract(6, "month")
    .set("date", 1)
    .format("YYYY-MM-DD");
  const range_end = current_date
    .set("date", current_date.daysInMonth())
    .format();

  const { data, error } = await supabase
    .from("visitor-session")
    .select()
    .gte("created_at", range_start)
    .lte("created_at", range_end);

  if (error) return c.json({ data: null, error });

  const chart = groupViewsChartData(data, { format: "YYYY-MM" });

  const chartData = {
    range_start,
    range_end,
    chart,
    error: null,
  };

  redis.set("views/half-year", JSON.stringify(chartData), { ex: 3600 * 24 });

  return c.json({
    range_start,
    range_end,
    chart,
    error: null,
  });
});

charts.get("/sessions", async (c) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const current_date = dayjs();
  const week_start = current_date.set("day", 1).format();
  const week_end = current_date.set("day", 7).format();

  const { data, error } = await supabase
    .from("visitor-session")
    .select()
    .gte("created_at", week_start)
    .lte("created_at", week_end);

  if (error) return c.json({ data: null, error });

  const avg_sessiong_time = Math.round(
    data.reduce((acc, curr) => {
      return acc + curr.duration;
    }, 0) / data.length,
  );

  const only_durations = data.map((d) => d.duration);
  const min_duration = Math.min(...only_durations);
  const max_duration = Math.max(...only_durations);

  return c.json({
    range_start: week_start,
    range_end: week_end,
    chart: {
      avg: avg_sessiong_time,
      max: max_duration,
      min: min_duration,
    },
    error: null,
  });
});
