import dayjs from "dayjs";
import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const charts = new Hono();

const groupViewsChartData = (chartData: any[]) => {
  const data: any[] = [];
  const labels: string[] = [];

  chartData.forEach((d) => {
    const date = dayjs(d.created_at).format("YYYY-MM-DD");
    if (!labels.includes(date)) {
      labels.push(date);
    }
  });

  labels.forEach((l) => {
    const count = chartData.filter(
      (d) => dayjs(d.created_at).format("YYYY-MM-DD") === l,
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
