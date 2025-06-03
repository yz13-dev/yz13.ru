import { expire, redis } from "@/extensions/redis";
import {
  addMinutes,
  format,
  interval,
  isValid,
  isWithinInterval,
  parse,
  parseISO,
} from "date-fns";
import { Hono, type HonoRequest } from "hono";
import { cookies } from "next/headers";
import type { DaySchedule, Event } from "rest-api/types/calendar";
import { createClient } from "yz13/supabase/server";
import { getLastEventsForDate } from "../calendar/actions";
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
  } return data;
};

schedule.get("/:uid", async (c) => {
  const uid = c.req.param("uid");
  const key = `schedule:${uid}`;
  try {
    const cached = await redis.get<Event[]>(key);
    if (cached) return c.json(cached);
    const schedule = await getSchedule(uid);
    if (schedule) await redis.set(key, schedule, { ex: expire.day });
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
    }
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
  const key = `schedule:${uid}`;
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
    if (data) await redis.set(key, data, { ex: expire.day });
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
  const durationInMinutes =
    duration.getMinutes() +
    duration.getSeconds() / 60 +
    duration.getHours() * 60;
  while (reachedEnd === false) {
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

const isBetween = (target: string, start: string, duration: string) => {
  const parsedStart = parse(start, "HH:mm", new Date());
  const parsedDuration = parse(duration, "HH:mm", new Date());
  const parsedTarget = parse(target, "HH:mm", new Date());
  const end = addMinutes(
    parsedStart,
    parsedDuration.getMinutes() + parsedDuration.getSeconds() / 60,
  );
  return isWithinInterval(parsedTarget, { start: parsedStart, end });
};

const getNextIterration = (time: string, duration: string) => {
  const start = parse(time, "HH:mm", new Date());
  const parsedDuration = parse(duration, "HH:mm", new Date());
  const end = addMinutes(
    start,
    parsedDuration.getMinutes() + parsedDuration.getSeconds() / 60,
  );
  return format(end, "HH:mm");
};

const createObjFromDurations = (
  durations: string[],
  schedule: DaySchedule[],
  busy: { time: string; duration: string }[],
) => {
  const obj: Record<string, string[]> = {};
  durations.forEach((duration) => {
    const parsed = parse(duration, "HH:mm:ss", new Date());
    const formatted = format(parsed, "HH:mm");

    const intervals = schedule.map((item) => {
      const start = parse(item.start.time, "HH:mm", new Date());
      const end = parse(item.end.time, "HH:mm", new Date());
      if (!item.enabled) return [];
      else return generateIntervalInRange(start, end, parsed);
    });

    const flatIntervals = intervals.flat();

    const filteredIntervals = flatIntervals.filter((item) => {
      return !busy.some(
        (busyItem) =>
          busyItem.time === item ||
          getNextIterration(busyItem.time, busyItem.duration) === item ||
          isBetween(item, busyItem.time, busyItem.duration),
      );
    });

    obj[formatted] = filteredIntervals;
  });
  return obj;
};

const getTimeAndDurationFromAppointments = (appointments: Event[]) => {
  const data: { time: string; duration: string }[] = [];
  appointments.forEach((appointment) => {
    const start = parseISO(appointment.date_start);
    if (!appointment.duration) return [];
    const duration = parse(appointment.duration, "HH:mm:ss", new Date());
    data.push({
      time: format(start, "HH:mm"),
      duration: format(duration, "HH:mm"),
    });
  });
  return data;
};

schedule.get("/:uid/available", async (c) => {
  const uid = c.req.param("uid");
  const date = c.req.query("date");
  const defaultDate = format(new Date(), "yyyy-MM-dd");
  const parsedDate = parse(date ?? defaultDate, "yyyy-MM-dd", new Date());
  try {
    if (!isValid(parsedDate)) throw new Error("Provided date is invalid");
    const allAppointments = await getLastEventsForDate(uid, {
      date: defaultDate,
      type: "appointment",
    });
    const appointments = allAppointments.filter((appointment) => appointment.status === "CONFIRMED" || appointment.status === "TENTATIVE");
    const weekday = format(parsedDate, "eeeeeeee").toLowerCase();
    const schedule = await getSchedule(uid);
    if (!schedule) return c.json(null);
    const busyTimes = getTimeAndDurationFromAppointments(appointments ?? []);
    const durations = schedule.durations;
    const weekdaySchedule = schedule[
      weekday as keyof typeof schedule
    ] as DaySchedule[];
    const obj = createObjFromDurations(
      durations ?? [],
      weekdaySchedule,
      busyTimes,
    );
    return c.json({
      availability: obj,
      date: format(parsedDate, "yyyy-MM-dd"),
      appointments,
    });
  } catch (error) {
    console.log(error);
    return c.json({
      availability: {},
      date: format(parsedDate, "yyyy-MM-dd"),
      appointments: [],
    });
  }
});
