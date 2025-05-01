import { formatISO, isValid, parse } from "date-fns";
import { Hono } from "hono";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";
import {
  getLastEvents,
  getLastEventsForDate,
  getLastEventsForPeriod,
} from "./actions";

export const calendar = new Hono();

calendar.get("/user/:uid", async (c) => {
  const uid = c.req.param("uid");
  const date_start = c.req.query("date_start");
  const date_end = c.req.query("date_end");
  const date = c.req.query("date");
  const parsedDate = parse(date ?? "", "yyyy-MM-dd", new Date());
  const isValidDate = isValid(parsedDate);
  const limit = c.req.query("limit") ?? "10";
  const parsedLimit = parseInt(limit);
  if (!uid) return c.json({ error: "uid is required" }, 400);
  try {
    if (date_start && date_end) {
      const parsedStartDate = parse(date_start, "yyyy-MM-dd", new Date());
      const parsedEndDate = parse(date_end, "yyyy-MM-dd", new Date());
      const isValidStartDate = isValid(parsedStartDate);
      const isValidEndDate = isValid(parsedEndDate);
      if (!isValidStartDate || !isValidEndDate) {
        return c.json({ error: "Invalid date" }, 400);
      }
      // events that have place in this date
      const data = await getLastEventsForPeriod(uid, date_start, date_end);
      return c.json(data);
    } else if (isValidDate) {
      const isoDate = formatISO(parsedDate);
      // events that have place in this date
      const data = await getLastEventsForDate(uid, isoDate);
      return c.json(data);
    } else {
      const data = await getLastEvents(uid, parsedLimit);
      return c.json(data);
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
