import { addDays, format, parseISO } from "date-fns";
import { cookies } from "next/headers";
import { Event } from "rest-api/types/calendar";
import { createClient } from "yz13/supabase/server";

type EventFilters = {
  type?: Event["type"];
  date?: string;
  start?: string;
  end?: string;
  limit?: number;
};
export const getUserEvents = (uid: string, options?: EventFilters) => {
  const { limit = 10, start, end, type = "event" } = options || {};
  if (start && end) return getLastEventsForPeriod(uid, { start, end, type });
  else if (start) return getLastEventsForDate(uid, { start, type });
  else return getLastEvents(uid, { limit, type });
};

export const getLastEvents = async (uid: string, filters?: EventFilters) => {
  const { limit = 10, type = "event" } = filters || {};
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("calendar_events")
    .select()
    .eq("type", type)
    .or(`organizer_id.eq.${uid},guests.cs.{"${uid}"}`)
    .limit(limit);
  if (error) {
    console.log(error);
    return [];
  } else return data;
};

export const getLastEventsForDate = async (
  uid: string,
  filters?: EventFilters,
) => {
  const { date = format(new Date(), "yyyy-MM-dd"), type = "event" } =
    filters || {};
  const isoDate = parseISO(date);
  const nextDay = addDays(isoDate, 1);
  const isoNextDay = format(nextDay, "yyyy-MM-dd HH:mm");
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("calendar_events")
    .select()
    .eq("type", type)
    .or(`organizer_id.eq.${uid},guests.cs.{"${uid}"}`)
    .gte("date_start", date)
    .lte("date_start", isoNextDay);

  if (error) {
    console.log(error);
    return [];
  } else return data;
};

export const getLastEventsForPeriod = async (
  uid: string,
  filters?: EventFilters,
) => {
  const {
    start = format(new Date(), "yyyy-MM-dd"),
    end = format(new Date(), "yyyy-MM-dd"),
    type = "event",
  } = filters || {};
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("calendar_events")
    .select()
    .eq("type", type)
    .or(`organizer_id.eq.${uid},guests.cs.{"${uid}"}`)
    .gte("date_start", start)
    .lte("date_end", end);
  if (error) {
    console.log(error);
    return [];
  } else return data;
};
