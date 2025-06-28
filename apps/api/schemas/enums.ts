import { z } from "zod";

export const chatTypeSchema = z.enum(["personal", "group"]);
export const eventTypeSchema = z.enum(["event", "appointment"]);
export const widgetTypeSchema = z.enum([
  "clock",
  "quick-link", 
  "notes",
  "calendar",
  "links-folder",
]);
export const worksStatusSchema = z.enum([
  "in_plans",
  "in_progress",
  "in_review", 
  "in_testing",
  "released",
]);

export type ChatType = z.infer<typeof chatTypeSchema>;
export type EventType = z.infer<typeof eventTypeSchema>;
export type WidgetType = z.infer<typeof widgetTypeSchema>;
export type WorksStatus = z.infer<typeof worksStatusSchema>; 