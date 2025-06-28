import type { CalendarEvent } from "@/schemas/calendar-events";
import { format, isValid, parse } from "date-fns";
import { Hono } from "hono";
import { getUserEvents } from "../../actions";

export const userEvents = new Hono();

userEvents.get("/", async (c) => {
  const uid = c.req.param("uid");
  const date_start = c.req.query("date_start");
  const date_end = c.req.query("date_end");
  const date = c.req.query("date");
  const parsedDate = parse(date ?? "", "yyyy-MM-dd", new Date());
  const isValidDate = isValid(parsedDate);
  const limit = c.req.query("limit") ?? "10";
  const type = (c.req.query("type")) as (CalendarEvent["type"] | undefined);
  const parsedLimit = Number.parseInt(limit);
  
  if (!uid) return c.json([], 400);
  
  try {
    if (date_start && date_end) {
      console.log("DATE RANGE", date_start, date_end);
      const parsedStartDate = parse(date_start, "yyyy-MM-dd", new Date());
      const parsedEndDate = parse(date_end, "yyyy-MM-dd", new Date());
      const isValidStartDate = isValid(parsedStartDate);
      const isValidEndDate = isValid(parsedEndDate);
      if (!isValidStartDate || !isValidEndDate) {
        return c.json([], 400);
      }
      // events that have place in this date
      const data = await getUserEvents(uid, {
        type,
        start: date_start,
        end: date_end,
      });
      return c.json(data);
    }
    
    if (isValidDate) {
      console.log("DATE", format(parsedDate, "yyyy-MM-dd"));
      const isoDate = format(parsedDate, "yyyy-MM-dd");
      // events that have place in this date
      const data = await getUserEvents(uid, {
        type,
        date: isoDate,
      });
      return c.json(data);
    }
    
    const data = await getUserEvents(uid, {
      type,
      limit: parsedLimit,
    });

    return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json([], 400);
  }
}); 