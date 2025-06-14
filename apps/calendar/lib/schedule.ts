import { tz } from "@date-fns/tz";
import type { DaySchedule, WeekSchedule } from "@yz13/api/types/calendar";
import { format, parse } from "date-fns";


export const adaptSchedule = (schedule: DaySchedule[], timezone: string): DaySchedule[] => {
  return schedule.map((item) => {
    const start = parse(item.start, "HH:mm", new Date());
    const end = parse(item.end, "HH:mm", new Date());
    console.log(start, end)
    return {
      enabled: item.enabled,
      start: format(start, "HH:mm"),
      end: format(end, "HH:mm"),
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
