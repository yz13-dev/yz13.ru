import { Tables, TablesInsert, TablesUpdate } from "yz13/supabase/database";

export type Event = Tables<"calendar_events">;
export type NewEvent = TablesInsert<"calendar_events">;
export type UpdateEvent = TablesUpdate<"calendar_events">;
