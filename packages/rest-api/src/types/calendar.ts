import type { Tables, TablesInsert, TablesUpdate } from "yz13/supabase/database";

export type Event = Tables<"calendar_events">;
export type NewEvent = TablesInsert<"calendar_events">;
export type UpdateEvent = TablesUpdate<"calendar_events">;

export type EventDateTime = {
  time?: string; // HH:MM
  date: string; // YYYY-MM-DD
  tz: string; // .../...
};

export type DaySchedule = {
  start: string; // HH:MM
  end: string; // HH:MM
  enabled: boolean;
};

export type Calendar = Tables<"calendar">;
export type NewCalendar = TablesInsert<"calendar">;
export type UpdateCalendar = TablesUpdate<"calendar">;

export type WeekSchedule = Tables<"calendar_schedule">;
export type NewWeekSchedule = TablesInsert<"calendar_schedule">;
export type UpdateWeekSchedule = TablesUpdate<"calendar_schedule">;

export type ScheduleAvailability = {
  availability: Record<string, string[]>;
  date: string;
  appointments: Event[];
};
