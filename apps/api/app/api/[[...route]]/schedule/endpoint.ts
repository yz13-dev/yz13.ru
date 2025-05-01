import {
  addMinutes,
  format,
  interval,
  isValid,
  isWithinInterval,
  parse,
} from "date-fns";
import { Hono, HonoRequest } from "hono";
import { cookies } from "next/headers";
import { DaySchedule } from "rest-api/types/calendar";
import { createClient } from "yz13/supabase/server";
import { getUser } from "../user";

export const schedule = new Hono();

const getSchedule = async (uid: string) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("calendar_schedule")
    .select()
    .eq("uid", uid)
    .maybeSingle();
  if (error) {
    console.log(error);
    return null;
  } else return data;
};

schedule.get("/:uid", async (c) => {
  const uid = c.req.param("uid");
  try {
    const schedule = await getSchedule(uid);
    return c.json(schedule);
  } catch (error) {
    console.log(error);
    return c.json([]);
  }
});

const getBody = async (c: HonoRequest) => {
  try {
    const body = await c.json();
    return body;
  } catch (error) {
    console.log(error);
    return null;
  }
};

schedule.post("/:uid", async (c) => {
  const uid = c.req.param("uid");
  const user = await getUser(uid);
  if (!user) return c.json(null);
  const body = await getBody(c.req);
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    if (!body) {
      const { data, error } = await supabase
        .from("calendar_schedule")
        .insert({
          uid,
        })
        .select()
        .maybeSingle();
      if (error) {
        console.log(error);
        return c.json(null);
      }
      return c.json(data);
    } else {
      const { data, error } = await supabase
        .from("calendar_schedule")
        .insert(body)
        .select()
        .maybeSingle();
      if (error) {
        console.log(error);
        return c.json(null);
      }
      return c.json(data);
    }
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});

schedule.patch("/:uid", async (c) => {
  const uid = c.req.param("uid");
  const user = await getUser(uid);
  if (!user) return c.json(null);
  const body = await getBody(c.req);
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("calendar_schedule")
      .update(body)
      .eq("uid", uid)
      .select()
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null);
    }
    return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});

const generateIntervalInRange = (start: Date, end: Date, duration: Date) => {
  let reachedEnd = false;
  let lastInterval: Date | null = null;
  let intervals: string[] = [format(start, "HH:mm")];
  const durationInMinutes = duration.getMinutes() + duration.getSeconds() / 60;
  while (!reachedEnd) {
    const intervalItem = interval(start, end);
    if (lastInterval) {
      const newInterval: Date = addMinutes(lastInterval, durationInMinutes);
      const isInRange = isWithinInterval(newInterval, intervalItem);
      const formatted = format(newInterval, "HH:mm");
      if (formatted === format(end, "HH:mm")) {
        reachedEnd = true;
        break;
      }
      if (!isInRange) {
        reachedEnd = true;
        break;
      }
      intervals = [...intervals, formatted];
      lastInterval = newInterval;
    } else {
      const newInterval: Date = addMinutes(start, durationInMinutes);
      const isInRange = isWithinInterval(newInterval, intervalItem);
      const formated = format(newInterval, "HH:mm");
      if (!isInRange) {
        reachedEnd = true;
        break;
      }
      intervals = [...intervals, formated];
      lastInterval = newInterval;
    }
  }
  return intervals;
};

const createObjFromDurations = (
  durations: string[],
  schedule: DaySchedule[],
) => {
  const obj: Record<string, string[][]> = {};
  durations.forEach((duration) => {
    const parsed = parse(duration, "HH:mm:ss", new Date());
    const formatted = format(parsed, "HH:mm");

    const intervals = schedule.map((item) => {
      const start = parse(item.start.time, "HH:mm", new Date());
      const end = parse(item.end.time, "HH:mm", new Date());
      if (!item.enabled) return [];
      else return generateIntervalInRange(start, end, parsed);
    });

    obj[formatted] = intervals;
  });
  return obj;
};

schedule.get("/:uid/available", async (c) => {
  const uid = c.req.param("uid");
  const date = c.req.query("date");
  const defaultDate = format(new Date(), "yyyy-MM-dd");
  const parsedDate = parse(date ?? defaultDate, "yyyy-MM-dd", new Date());
  try {
    if (!isValid(parsedDate)) throw new Error("Provided date is invalid");
    const weekday = format(parsedDate, "eeeeeeee").toLowerCase();
    const schedule = await getSchedule(uid);
    if (!schedule) return c.json(null);
    const durations = schedule.durations;
    const weekdaySchedule = schedule[
      weekday as keyof typeof schedule
    ] as DaySchedule[];
    const obj = createObjFromDurations(durations ?? [], weekdaySchedule);
    return c.json({
      availability: obj,
      date: format(parsedDate, "yyyy-MM-dd"),
    });
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});
