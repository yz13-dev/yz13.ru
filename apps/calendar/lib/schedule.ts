import { tz } from "@date-fns/tz";
import { format, parse } from "date-fns";
import type { DaySchedule, WeekSchedule } from "rest-api/types/calendar";


const adaptSchedule = (schedule: DaySchedule[]): DaySchedule[] => {
  return schedule.map((item) => {
    const start = parse(item.start.time, "HH:mm", new Date(), {
      in: tz("UTC"),
    });
    const end = parse(item.end.time, "HH:mm", new Date(), {
      in: tz("UTC"),
    });
    const timezone = item.start.tz;
    return {
      enabled: item.enabled,
      start: {
        ...item.start,
        time: format(start, "HH:mm", {
          in: tz(timezone),
        }),
      },
      end: {
        ...item.end,
        time: format(end, "HH:mm", {
          in: tz(timezone),
        }),
      },
    }
  });
};

export const adaptWeekSchedule = (schedule: WeekSchedule): WeekSchedule => {
  return {
    ...schedule,
    monday: adaptSchedule((schedule.monday ?? []) as DaySchedule[]),
    tuesday: adaptSchedule((schedule.tuesday ?? []) as DaySchedule[]),
    wednesday: adaptSchedule((schedule.wednesday ?? []) as DaySchedule[]),
    thursday: adaptSchedule((schedule.thursday ?? []) as DaySchedule[]),
    friday: adaptSchedule((schedule.friday ?? []) as DaySchedule[]),
    saturday: adaptSchedule((schedule.saturday ?? []) as DaySchedule[]),
    sunday: adaptSchedule((schedule.sunday ?? []) as DaySchedule[]),
  }
}
