import { expire, redis } from "@/extensions/redis";
import { tz } from "@date-fns/tz";
import { addMinutes, areIntervalsOverlapping, format, type Interval, interval, isWithinInterval, parse, parseISO } from "date-fns";
import { cookies } from "next/headers";
import type { DaySchedule, Event, WeekSchedule } from "rest-api/types/calendar";
import { createClient } from "yz13/supabase/server";

export const generateIntervalInRange = (
  start: Date,
  end: Date,
  durationMinutes: number,
  disabledIntervals: Interval[] = []
): Interval[] => {
  // Validate inputs
  if (durationMinutes <= 0) return [];
  if (start >= end) return [];

  const result: Interval[] = [];
  let currentStart = start;

  while (true) {
    const currentEnd = addMinutes(currentStart, durationMinutes);

    // Stop if we've reached or passed the end time
    if (currentEnd >= end) break;

    const newInterval = { start: currentStart, end: currentEnd };

    // Check if the new interval is valid
    const isInRange = isWithinInterval(currentEnd, { start, end });
    const isOverlapping = disabledIntervals.some(disabled =>
      areIntervalsOverlapping(newInterval, disabled)
    );

    if (isInRange && !isOverlapping) {
      result.push(newInterval);
    }

    currentStart = currentEnd;
  }

  return result;
};

export const createObjFromDurations = (
  durations: string[],
  schedule: DaySchedule[],
  busy: { time: string; duration: string }[],
) => {
  const obj: Record<string, string[]> = {};
  for (const duration of durations) {
    const parsed = parse(duration, "HH:mm:ss", new Date());
    const formatted = format(parsed, "HH:mm");

    const busyIntervals = busy.flatMap(item => {
      const { start, end } = getIntervalFromTimeAndDuration(item.time, item.duration);
      return interval(start, end);
    })


    const intervals = schedule.flatMap((item) => {
      const start = parse(item.start, "HH:mm", new Date(), { in: tz("UTC") });
      const end = parse(item.end, "HH:mm", new Date(), { in: tz("UTC") });
      if (!item.enabled) return [];
      const durationInMunutes = parsed.getHours() * 60 + parsed.getMinutes();
      return generateIntervalInRange(start, end, durationInMunutes, busyIntervals);
    })

    if (busyIntervals.length === 0) {

      const result = intervals.map(interval => format(interval.start, "HH:mm"))
      obj[formatted] = result;

      continue;
    }

    const filterOverlappingIntervals = intervals.filter(interval => {
      const intStartFormatted = format(interval.start, "HH:mm", { in: tz("UTC") });
      const intEndFormatted = format(interval.end, "HH:mm", { in: tz("UTC") });
      return busyIntervals.some(busy => {
        const busyStartFormatted = format(busy.start, "HH:mm", { in: tz("UTC") });
        const busyEndFormatted = format(busy.end, "HH:mm", { in: tz("UTC") });
        console.log("OVERLAP CHECK")
        console.log("INTERVAL", intStartFormatted, intEndFormatted)
        console.log("BUSY", busyStartFormatted, busyEndFormatted)
        console.log("ARE OVERLAPPING", areIntervalsOverlapping(interval, busy))
        return !areIntervalsOverlapping(interval, busy)
      })
    })

    const result = filterOverlappingIntervals.map(interval => format(interval.start, "HH:mm"))

    obj[formatted] = result;
  }
  return obj;
};

export const getIntervalFromTimeAndDuration = (time: string, duration: string) => {
  const parsedDuration = parse(duration, "HH:mm", new Date(), {
    in: tz("UTC"),
  });
  const parsedTime = parse(time, "HH:mm", new Date());
  const start = parsedTime;
  const durationInMinutes = parsedDuration.getHours() * 60 + parsedDuration.getMinutes();
  const end = addMinutes(
    parsedTime,
    durationInMinutes,
  );
  // console.log("START", time, start, end)
  return interval(start, end);
};

export const getTimeAndDurationFromAppointments = (appointments: Event[],) => {
  const data: { time: string; duration: string }[] = [];
  for (const appointment of appointments) {
    const start = parseISO(appointment.date_start);
    if (!appointment.duration) return [];
    const duration = parse(appointment.duration, "HH:mm:ss", new Date());
    data.push({
      time: format(start, "HH:mm"),
      duration: format(duration, "HH:mm"),
    });
  }
  return data;
};


export const getSchedule = async (uid: string): Promise<WeekSchedule | null> => {
  const key = `schedule:${uid}`;
  const cached = await redis.get<WeekSchedule>(key);
  if (cached) return cached;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("calendar_schedule")
    .select("*, calendar:calendar(*)")
    .eq("uid", uid)
    .maybeSingle();
  if (error) {
    console.log(error);
    return null;
  }

  if (data) await redis.set(key, data, { ex: expire.day });
  return data as WeekSchedule | null;
};
