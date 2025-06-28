import type { CalendarEvent } from "@/schemas/calendar-events";
import { calendarEventsArraySchema } from "@/schemas/calendar-events";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { format, isValid, parse } from "date-fns";
import { getUserEvents } from "../../actions";

const routeGETUserEvents = createRoute({
  method: "get",
  path: "/{uid}",
  request: {
    params: z.object({
      uid: z.string()
    }),
    query: z.object({
      date_start: z.string().optional(),
      date_end: z.string().optional(),
      date: z.string().optional(),
      limit: z.string().optional(),
      type: z.string().optional()
    })
  },
  responses: {
    200: {
      description: "Get user events",
      content: {
        "application/json": {
          schema: calendarEventsArraySchema
        }
      }
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string()
          })
        }
      }
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string()
          })
        }
      }
    }
  }
});

export const userEvents = new OpenAPIHono();

userEvents.openapi(routeGETUserEvents, async (c) => {
  const uid = c.req.param("uid");
  const date_start = c.req.query("date_start");
  const date_end = c.req.query("date_end");
  const date = c.req.query("date");
  const parsedDate = parse(date ?? "", "yyyy-MM-dd", new Date());
  const isValidDate = isValid(parsedDate);
  const limit = c.req.query("limit") ?? "10";
  const type = (c.req.query("type")) as (CalendarEvent["type"] | undefined);
  const parsedLimit = Number.parseInt(limit);
  
  if (!uid) return c.json({ error: "User ID is required" }, 400);
  
  try {
    if (date_start && date_end) {
      console.log("DATE RANGE", date_start, date_end);
      const parsedStartDate = parse(date_start, "yyyy-MM-dd", new Date());
      const parsedEndDate = parse(date_end, "yyyy-MM-dd", new Date());
      const isValidStartDate = isValid(parsedStartDate);
      const isValidEndDate = isValid(parsedEndDate);
      if (!isValidStartDate || !isValidEndDate) {
        return c.json({ error: "Invalid date format" }, 400);
      }
      // events that have place in this date
      const data = await getUserEvents(uid, {
        type,
        start: date_start,
        end: date_end,
      });
      return c.json(data, 200);
    }
    
    if (isValidDate) {
      console.log("DATE", format(parsedDate, "yyyy-MM-dd"));
      const isoDate = format(parsedDate, "yyyy-MM-dd");
      // events that have place in this date
      const data = await getUserEvents(uid, {
        type,
        date: isoDate,
      });
      return c.json(data, 200);
    }
    
    const data = await getUserEvents(uid, {
      type,
      limit: parsedLimit,
    });

    return c.json(data, 200);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Internal server error" }, 500);
  }
}); 