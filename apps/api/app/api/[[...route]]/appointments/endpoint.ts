import { format, parse } from "date-fns";
import { Hono } from "hono";
import { getUserAppointmentsForDate } from "./actions";

export const appointments = new Hono();

appointments.get("/:uid", async (c) => {
  const uid = c.req.param("uid");
  const date = c.req.query("date");
  const defaultDate = format(new Date(), "yyyy-MM-dd");
  const parsedDate = parse(date ?? defaultDate, "yyyy-MM-dd", new Date());
  try {
    const appointments = await getUserAppointmentsForDate(uid, defaultDate);
    return c.json(appointments);
  } catch (error) {
    console.log(error);
    return c.json([]);
  }
});
