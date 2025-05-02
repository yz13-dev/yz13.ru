import { addDays, format, parse } from "date-fns";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const getUserAppointmentsForDate = async (uid: string, date: string) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const parsed = parse(date, "yyyy-MM-dd", new Date());
  parsed.setHours(0);
  parsed.setMinutes(0);
  const nextDay = addDays(parsed, 1);
  const todayFormatted = format(parsed, "yyyy-MM-dd HH:mm");
  const nextDayFormatted = format(nextDay, "yyyy-MM-dd HH:mm");

  const { data, error } = await supabase
    .from("calendar_appointments")
    .select()
    .eq("uid", uid)
    .gte("date", todayFormatted)
    .lte("date", nextDayFormatted);
  // console.log(data, error);
  if (error) {
    console.log(error);
    return null;
  } else return data;
};
