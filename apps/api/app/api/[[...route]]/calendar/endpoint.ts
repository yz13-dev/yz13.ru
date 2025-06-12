import { Hono } from "hono";
import { createCalendar, deleteCalendar, getCalendar, getCalendars, getDefaultCalendar, updateCalendar } from "./actions";



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

calendar.post("/user/:uid", async (c) => {
  const uid = c.req.param("uid");
  const body = await c.req.json();
  try {
    const data = await createCalendar(uid, body);
    return c.json(data);
  } catch (error) {
    return c.json(null, 400);
  }
});

calendar.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json()
  try {
    const data = await updateCalendar(id, body);
    return c.json(data);
  } catch (error) {
    return c.json(null, 400);
  }
});

calendar.delete("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const data = await deleteCalendar(id);
    return c.json(data);
  } catch (error) {
    return c.json(null, 400);
  }
});

calendar.get("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const data = await getCalendar(id);
    return c.json(data);
  } catch (error) {
    return c.json(null, 400);
  }
});
