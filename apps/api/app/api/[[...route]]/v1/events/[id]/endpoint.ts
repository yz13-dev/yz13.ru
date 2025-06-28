import { Hono } from "hono";
import { getEventById, updateEvent } from "../actions";

export const eventById = new Hono();

eventById.get("/", async (c) => {
  const id = c.req.param("id");
  if (!id) return c.json(null, 400);
  
  try {
    const data = await getEventById(id);
    return c.json(data, 200);
  } catch (error) {
    return c.json(null, 400);
  }
});

eventById.patch("/", async (c) => {
  const id = c.req.param("id");
  if (!id) return c.json(null, 400);
  
  try {
    const body = await c.req.json();
    if (!body) return c.json(null, 400);
    
    const data = await updateEvent(id, body);
    if (!data) return c.json(null, 400);
    
    return c.json(data);
  } catch (error) {
    return c.json(null, 400);
  }
}); 