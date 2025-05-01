import { addDays, format, parse } from "date-fns";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const getUserAppointmentsForDate = async (uid: string, date: string) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const parsed = parse(date, "yyyy-MM-dd", new Date());
  const nextDay = addDays(parsed, 1);
  const todayFormatted = format(parsed, "yyyy-MM-dd HH:mm");
  const nextDayFormatted = format(nextDay, "yyyy-MM-dd HH:mm");

  const { data, error } = await supabase
    .from("calendar_appointment")
    .select()
    .eq("uid", uid)
    .gte("date_start", todayFormatted)
    .lte("date_start", nextDayFormatted);
  if (error) {
    console.log(error);
    return null;
  } else return data;
};
