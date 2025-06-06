import { Hono } from "hono";
import { getDefaultCalendar } from "./actions";



export const calendar = new Hono();


calendar.get("/user/:uid/default", async (c) => {
  const uid = c.req.param("uid");

  if (!uid) return c.json(null, 400);

  const data = await getDefaultCalendar(uid);

  return c.json(data);
});
