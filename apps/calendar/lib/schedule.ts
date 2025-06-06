import { tz } from "@date-fns/tz";
import { format, parse } from "date-fns";
import type { DaySchedule, WeekSchedule } from "rest-api/types/calendar";


export const adaptSchedule = (schedule: DaySchedule[], timezone: string): DaySchedule[] => {
  return schedule.map((item) => {
    const start = parse(item.start, "HH:mm", new Date(), {
      in: tz("UTC"),
    });
    const end = parse(item.end, "HH:mm", new Date(), {
      in: tz("UTC"),
    });
    return {
      enabled: item.enabled,
      start: format(start, "HH:mm", {
        in: tz(timezone),
      }),
      end: format(end, "HH:mm", {
        in: tz(timezone),
      }),
    }
  });
};

export const adaptWeekSchedule = (schedule: WeekSchedule | null, timezone = "UTC"): WeekSchedule | null => {
  if (!schedule) return null;
  return {
    ...schedule,
    monday: adaptSchedule((schedule.monday ?? []) as DaySchedule[], timezone),
    tuesday: adaptSchedule((schedule.tuesday ?? []) as DaySchedule[], timezone),
    wednesday: adaptSchedule((schedule.wednesday ?? []) as DaySchedule[], timezone),
    thursday: adaptSchedule((schedule.thursday ?? []) as DaySchedule[], timezone),
    friday: adaptSchedule((schedule.friday ?? []) as DaySchedule[], timezone),
    saturday: adaptSchedule((schedule.saturday ?? []) as DaySchedule[], timezone),
    sunday: adaptSchedule((schedule.sunday ?? []) as DaySchedule[], timezone),
  }
}
