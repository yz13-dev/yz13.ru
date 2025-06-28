import { z } from "zod";
import { eventTypeSchema } from "./enums";

export const calendarEventsSchema = z.object({
  id: z.string().uuid(),
  calendar_id: z.string().uuid(),
  organizer_id: z.string(),
  summary: z.string(),
  description: z.string().nullable(),
  date_start: z.string().datetime(),
  date_end: z.string().datetime(),
  all_day: z.boolean().nullable(),
  location: z.string().nullable(),
  geo_lat: z.number().nullable(),
  geo_lon: z.number().nullable(),
  duration: z.string().nullable(),
  type: eventTypeSchema,
  status: z.string().nullable(),
  class: z.string().nullable(),
  categories: z.array(z.string()).nullable(),
  guests: z.array(z.string()).nullable(),
  url: z.string().nullable(),
  conference_id: z.string().nullable(),
  recurrence_id: z.string().nullable(),
  recurrence_rule: z.string().nullable(),
  sequence: z.number().nullable(),
  created: z.string().datetime().nullable(),
  last_modified: z.string().datetime().nullable(),
});

export const calendarEventsInsertSchema = calendarEventsSchema.omit({
  id: true,
  created: true,
  last_modified: true,
}).partial({
  organizer_id: true,
  all_day: true,
  location: true,
  geo_lat: true,
  geo_lon: true,
  duration: true,
  type: true,
  status: true,
  class: true,
  categories: true,
  guests: true,
  url: true,
  conference_id: true,
  recurrence_id: true,
  recurrence_rule: true,
  sequence: true,
});

export const calendarEventsUpdateSchema = calendarEventsSchema.partial().omit({
  id: true,
});

export const calendarEventsArraySchema = z.array(calendarEventsSchema);

export type CalendarEvent = z.infer<typeof calendarEventsSchema>;
export type CalendarEventInsert = z.infer<typeof calendarEventsInsertSchema>;
export type CalendarEventUpdate = z.infer<typeof calendarEventsUpdateSchema>; 