import { z } from "zod";

export const meetingSchema = z.object({
  id: z.number(),
  topic: z.string(),
  type: z.number(),
  start_time: z.string().datetime(),
  duration: z.number(),
  timezone: z.string(),
  agenda: z.string().nullable(),
  created_at: z.string().datetime(),
  start_url: z.string().url().nullable(),
  join_url: z.string().url().nullable(),
  password: z.string().nullable(),
  h323_password: z.string().nullable(),
  pstn_password: z.string().nullable(),
  encrypted_password: z.string().nullable(),
  settings: z.any().nullable(), // Json type
  pre_schedule: z.boolean().nullable(),
});

export const createMeetingSchema = z.object({
  topic: z.string(),
  type: z.number().default(2),
  start_time: z.string().datetime(),
  duration: z.number(),
  timezone: z.string(),
  agenda: z.string().optional(),
  pre_schedule: z.boolean().optional(),
});

export const meetingArraySchema = z.array(meetingSchema);

export type Meeting = z.infer<typeof meetingSchema>;
export type CreateMeeting = z.infer<typeof createMeetingSchema>; 