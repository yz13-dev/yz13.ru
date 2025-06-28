import { Hono } from "hono";
import { createEvent } from "./actions";

export const events = new Hono();

events.post("/", async (c) => {
  const body = await c.req.json();
  if (!body) return c.json(null, 400);
  
  try {
    const data = await createEvent(body);
    if (!data) return c.json(null, 400);
    return c.json(data);
  } catch (error) {
    return c.json(null, 400);
  }
}); 