import { redis } from "@/extensions/redis";
import type { Event } from "@yz13/api/types/calendar";
import { createClient } from "@yz13/supabase/server";
import { format, isValid, parse, parseISO } from "date-fns";
import { Hono } from "hono";
import { cookies } from "next/headers";
import { getEventById, getLastEvents, getLastEventsForDate, getUserEvents } from "./actions";

export const events = new Hono();

events.get("/user/:uid", async (c) => {
  const uid = c.req.param("uid");
  const date_start = c.req.query("date_start");
  const date_end = c.req.query("date_end");
  const date = c.req.query("date");
  const parsedDate = parse(date ?? "", "yyyy-MM-dd", new Date());
  const isValidDate = isValid(parsedDate);
  const limit = c.req.query("limit") ?? "10";
  const type = (c.req.query("type")) as (Event["type"] | undefined);
  const parsedLimit = Number.parseInt(limit);
  if (!uid) return c.json([], 400);
  try {
    if (date_start && date_end) {
      console.log("DATE RANGE", date_start, date_end);
      const parsedStartDate = parse(date_start, "yyyy-MM-dd", new Date());
      const parsedEndDate = parse(date_end, "yyyy-MM-dd", new Date());
      const isValidStartDate = isValid(parsedStartDate);
      const isValidEndDate = isValid(parsedEndDate);
      if (!isValidStartDate || !isValidEndDate) {
        return c.json([], 400);
      }
      // events that have place in this date
      const data = await getUserEvents(uid, {
        type,
        start: date_start,
        end: date_end,
      });
      return c.json(data);
    }
    if (isValidDate) {
      console.log("DATE", format(parsedDate, "yyyy-MM-dd"));
      const isoDate = format(parsedDate, "yyyy-MM-dd");
      // events that have place in this date
      const data = await getLastEventsForDate(uid, {
        type,
        date: isoDate,
      });
      return c.json(data);
    }
    const data = await getLastEvents(uid, {
      type,
      limit: parsedLimit,
    });

    return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json([], 400);
  }
});

events.get("/:id", async (c) => {
  const id = c.req.param("id");
  if (!id) return c.json(null, 400);
  try {
    const data = await getEventById(id);
    return c.json(data, 200);
  } catch (error) {
    return c.json(null, 400);
  }
});

events.patch("/:id", async (c) => {
  const id = c.req.param("id");
  if (!id) return c.json(null, 400);
  try {
    const body = await c.req.json();
    if (!body) return c.json(null, 400);
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("calendar_events")
      .update(body)
      .eq("id", id)
      .select()
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null, 400);
    }

    if (data) {
      const organizer_id = data.organizer_id;
      const startAt = parseISO(data.date_start);
      const startAtFormatted = format(startAt, "yyyy-MM-dd");
      const key = `events:${organizer_id}:${startAtFormatted}`;
      const eventKey = `${key}:event`
      const appointmentKey = `${key}:appointment`
      const availabilityKey = `${key}:availability:${startAtFormatted}`
      redis.del(key);
      redis.del(eventKey);
      redis.del(appointmentKey);
      redis.del(availabilityKey);
    }

    return c.json(data);
  } catch (error) {
    return c.json(null, 400);
  }
});

events.post("/", async (c) => {
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
    }

    if (data) {
      const organizer_id = data.organizer_id;
      const startAt = parseISO(data.date_start);
      const startAtFormatted = format(startAt, "yyyy-MM-dd");
      const key = `events:${organizer_id}:${startAtFormatted}`;
      const eventKey = `${key}:event`
      const appointmentKey = `${key}:appointment`
      const availabilityKey = `${key}:availability:${startAtFormatted}`
      redis.del(key);
      redis.del(eventKey);
      redis.del(appointmentKey);
      redis.del(availabilityKey);
    }

    return c.json(data);
  } catch (error) {
    return c.json(null, 400);
  }
});
