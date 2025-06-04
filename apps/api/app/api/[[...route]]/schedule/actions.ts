import { tz } from "@date-fns/tz";
import { addMinutes, areIntervalsOverlapping, format, type Interval, interval, isWithinInterval, parse, parseISO } from "date-fns";
import type { DaySchedule, Event } from "rest-api/types/calendar";

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
      const start = parse(item.start.time, "HH:mm", new Date(), {
        in: tz("UTC"),
      });
      const end = parse(item.end.time, "HH:mm", new Date(), {
        in: tz("UTC"),
      });
      if (!item.enabled) return [];
      const durationInMunutes = parsed.getHours() * 60 + parsed.getMinutes();
      return generateIntervalInRange(start, end, durationInMunutes, busyIntervals);
    })
      .map(item => format(item.start, "HH:mm", {
        in: tz("UTC"),
      }));

    obj[formatted] = intervals;
  }
  return obj;
};

export const getIntervalFromTimeAndDuration = (time: string, duration: string) => {
  const parsedDuration = parse(duration, "HH:mm", new Date());
  const parsedTime = parse(time, "HH:mm", new Date());
  const end = addMinutes(
    parsedTime,
    parsedDuration.getMinutes(),
  );
  return interval(parsedTime, end);
};

export const getTimeAndDurationFromAppointments = (appointments: Event[],) => {
  const data: { time: string; duration: string }[] = [];
  for (const appointment of appointments) {
    const start = parseISO(appointment.date_start, {
      in: tz("UTC"),
    });
    if (!appointment.duration) return [];
    const duration = parse(appointment.duration, "HH:mm:ss", new Date());
    data.push({
      time: format(start, "HH:mm", {
        in: tz("UTC"),
      }),
      duration: format(duration, "HH:mm"),
    });
  }
  return data;
};
