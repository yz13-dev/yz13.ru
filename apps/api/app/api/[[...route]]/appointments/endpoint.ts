import { format, parse } from "date-fns";
import { Hono } from "hono";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";
import { getUserAppointmentsForDate } from "./actions";

export const appointments = new Hono();

appointments.get("/:uid", async (c) => {
  const uid = c.req.param("uid");
  const date = c.req.query("date");
  const defaultDate = format(new Date(), "yyyy-MM-dd");
  const parsedDate = parse(date ?? defaultDate, "yyyy-MM-dd", new Date());
  try {
    const appointments = await getUserAppointmentsForDate(
      uid,
      format(parsedDate, "yyyy-MM-dd"),
    );
    return c.json(appointments);
  } catch (error) {
    console.log(error);
    return c.json([]);
  }
});

appointments.post("/:uid", async (c) => {
  const uid = c.req.param("uid");
  const appointment = await c.req.json();
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("calendar_appointments")
      .insert({
        uid,
        ...appointment,
      })
      .select()
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null);
    }
    return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});
