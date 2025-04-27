import { Tables, TablesInsert, TablesUpdate } from "yz13/supabase/database";

export type Event = Tables<"calendar_events">;
export type NewEvent = TablesInsert<"calendar_events">;
export type UpdateEvent = TablesUpdate<"calendar_events">;

export type EventDateTime = {
  time?: string; // HH:MM
  date: string; // YYYY-MM-DD
  tz: string; // .../...
};

type DaySchedule = {
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

export type WeekSchedule = {
  userId: string;
  monday: DaySchedule | null;
  tuesday: DaySchedule | null;
  wednesday: DaySchedule | null;
  thursday: DaySchedule | null;
  friday: DaySchedule | null;
  saturday: DaySchedule | null;
  sunday: DaySchedule | null;
};
