import dayjs from "dayjs";
import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const charts = new Hono();

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
  if (error) return c.json({ data: [], error });
  return c.json({
    start: week_start,
    end: week_end,
    data,
    error: null,
  });
});
