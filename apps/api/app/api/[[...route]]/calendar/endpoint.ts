import { Hono } from "hono";
import { getCalendars, getDefaultCalendar } from "./actions";



export const calendar = new Hono();


calendar.get("/user/:uid/default", async (c) => {
  const uid = c.req.param("uid");

  if (!uid) return c.json(null, 400);

  const data = await getDefaultCalendar(uid);

  return c.json(data);
});

calendar.get("/user/:uid", async (c) => {
  const uid = c.req.param("uid");
  try {
    const data = await getCalendars(uid);
    return c.json(data);
  } catch (error) {
    return c.json([], 400);
  }
});
