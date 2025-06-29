import { CalendarSchedule, CalendarScheduleDay } from "@/schemas";
import { tz } from "@date-fns/tz";
import { format, parse } from "date-fns";


export const adaptSchedule = (schedule: CalendarScheduleDay[], timezone: string): CalendarScheduleDay[] => {
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

export const adaptWeekSchedule = (schedule: CalendarSchedule, timezone: string): CalendarSchedule => {
  return {
    ...schedule,
    monday: adaptSchedule((schedule.monday ?? []) as CalendarScheduleDay[], timezone),
    tuesday: adaptSchedule((schedule.tuesday ?? []) as CalendarScheduleDay[], timezone),
    wednesday: adaptSchedule((schedule.wednesday ?? []) as CalendarScheduleDay[], timezone),
    thursday: adaptSchedule((schedule.thursday ?? []) as CalendarScheduleDay[], timezone),
    friday: adaptSchedule((schedule.friday ?? []) as CalendarScheduleDay[], timezone),
    saturday: adaptSchedule((schedule.saturday ?? []) as CalendarScheduleDay[], timezone),
    sunday: adaptSchedule((schedule.sunday ?? []) as CalendarScheduleDay[], timezone),
  }
}
