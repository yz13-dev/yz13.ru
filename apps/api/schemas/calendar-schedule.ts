import { z } from "zod";

export const calendarScheduleSchema = z.object({
  uid: z.string(),
  calendar_id: z.string().uuid(),
  monday: z.array(z.any()).nullable(),
  tuesday: z.array(z.any()).nullable(),
  wednesday: z.array(z.any()).nullable(),
  thursday: z.array(z.any()).nullable(),
  friday: z.array(z.any()).nullable(),
  saturday: z.array(z.any()).nullable(),
  sunday: z.array(z.any()).nullable(),
  durations: z.array(z.string()).nullable(),
});

export const calendarScheduleInsertSchema = calendarScheduleSchema.omit({
  uid: true,
}).partial({
  monday: true,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: true,
  saturday: true,
  sunday: true,
  durations: true,
});

export const calendarScheduleUpdateSchema = calendarScheduleSchema.partial().omit({
  uid: true,
});

export const calendarSchedulesArraySchema = z.array(calendarScheduleSchema);

export type CalendarSchedule = z.infer<typeof calendarScheduleSchema>;
export type CalendarScheduleDay = NonNullable<CalendarSchedule["friday"]>[number];
export type CalendarScheduleInsert = z.infer<typeof calendarScheduleInsertSchema>;
export type CalendarScheduleUpdate = z.infer<typeof calendarScheduleUpdateSchema>;
