import { addDays, format, parseISO } from "date-fns";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const getLastEvents = async (uid: string, limit: number = 10) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("calendar_events")
    .select()
    .eq("uid", uid)
    .limit(limit);

  if (error) {
    console.log(error);
    return [];
  } else return data;
};

export const getLastEventsForDate = async (uid: string, date: string) => {
  const isoDate = parseISO(date);
  const nextDay = addDays(isoDate, 1);
  const isoNextDay = format(nextDay, "yyyy-MM-dd HH:mm");
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("calendar_events")
    .select()
    .eq("uid", uid)
    .gte("date_start", date)
    .lte("date_start", isoNextDay);

  if (error) {
    console.log(error);
    return [];
  } else return data;
};

export const getLastEventsForPeriod = async (
  uid: string,
  start: string,
  end: string,
) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("calendar_events")
    .select()
    .eq("uid", uid)
    .gte("date_start", start)
    .lte("date_end", end);

  if (error) {
    console.log(error);
    return [];
  } else return data;
};
