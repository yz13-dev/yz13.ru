import { Tables, TablesInsert, TablesUpdate } from "yz13/supabase/database";

export type Event = Tables<"calendar_events">;
export type NewEvent = TablesInsert<"calendar_events">;
export type UpdateEvent = TablesUpdate<"calendar_events">;

export type EventDateTime = {
  time?: string; // HH:MM
  date: string; // YYYY-MM-DD
  tz: string; // .../...
};

export type DaySchedule = {
  start: {
    time: string; // HH:MM
    tz: string; // .../..
  };
  end: {
    time: string; // HH:MM
    tz: string; // .../..
  };
  enabled: boolean;
};

export type ScheduleAvailability = {
  availability: Record<string, string[][]>;
  date: string;
};

export type WeekSchedule = Tables<"calendar_schedule">;
export type NewWeekSchedule = TablesInsert<"calendar_schedule">;
export type UpdateWeekSchedule = TablesUpdate<"calendar_schedule">;
