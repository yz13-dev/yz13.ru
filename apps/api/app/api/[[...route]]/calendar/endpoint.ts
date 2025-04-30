import { addDays, format, isValid, parse } from "date-fns";
import { Hono } from "hono";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const calendar = new Hono();

calendar.get("/user/:uid", async (c) => {
  const uid = c.req.param("uid");
  const date = c.req.query("date");
  const parsedDate = parse(date ?? "", "yyyy-MM-dd", new Date());
  const isValidDate = isValid(parsedDate);
  if (!uid) return c.json({ error: "uid is required" }, 400);
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    if (isValidDate) {
      const isoDate = format(parsedDate, "yyyy-MM-dd HH:mm");
      const nextDay = addDays(parsedDate, 1);
      const isoNextDay = format(nextDay, "yyyy-MM-dd HH:mm");
      // events that have place in this date
      const { data, error } = await supabase
        .from("calendar_events")
        .select()
        .eq("uid", uid)
        .gte("date_start", isoDate)
        .lte("date_start", isoNextDay)
        .limit(10);
      if (error) {
        console.log(error);
        return c.json([], 400);
      } else return c.json(data);
    } else {
      const { data, error } = await supabase
        .from("calendar_events")
        .select()
        .eq("uid", uid)
        .limit(10);
      if (error) {
        console.log(error);
        return c.json([], 400);
      } else return c.json(data);
    }
  } catch (error) {
    return c.json([], 400);
  }
});

calendar.post("/", async (c) => {
  const body = await c.req.json();
  if (!body) return c.json(null, 400);
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("calendar_events")
      .insert(body)
      .select()
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null, 400);
    } else return c.json(data);
  } catch (error) {
    return c.json(null, 400);
  }
});
