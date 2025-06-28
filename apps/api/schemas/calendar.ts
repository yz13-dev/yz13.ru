import { z } from "zod";

export const calendarSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string(),
  name: z.string().nullable(),
  description: z.string().nullable(),
  timezone: z.string().nullable(),
  is_default: z.boolean().nullable(),
  is_public: z.boolean().nullable(),
  visible: z.boolean().nullable(),
  shared_with: z.array(z.string()).nullable(),
  created_at: z.string().datetime(),
});

export const calendarInsertSchema = calendarSchema.omit({
  id: true,
  created_at: true,
}).partial({
  user_id: true,
  name: true,
  description: true,
  timezone: true,
  is_default: true,
  is_public: true,
  visible: true,
  shared_with: true,
});

export const calendarUpdateSchema = calendarSchema.partial().omit({
  id: true,
});

export const calendarsArraySchema = z.array(calendarSchema);

export type Calendar = z.infer<typeof calendarSchema>;
export type CalendarInsert = z.infer<typeof calendarInsertSchema>;
export type CalendarUpdate = z.infer<typeof calendarUpdateSchema>; 