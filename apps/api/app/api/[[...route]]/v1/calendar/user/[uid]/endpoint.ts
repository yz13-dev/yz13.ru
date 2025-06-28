import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { createCalendar, getCalendars } from "../../actions";

const routeGETCalendars = createRoute({
  method: "get",
  path: "/{uid}",
  request: {
    params: z.object({
      uid: z.string()
    })
  },
  responses: {
    200: {
      description: "Get calendars by uid",
      content: {
        "application/json": {
          schema: z.any()
        }
      }
    }
  }
});

const routePOSTCalendar = createRoute({
  method: "post",
  path: "/{uid}",
  request: {
    params: z.object({
      uid: z.string()
    }),
    body: {
      content: {
        "application/json": {
          schema: z.any()
        }
      }
    }
  },
  responses: {
    200: {
      description: "Create calendar",
      content: {
        "application/json": {
          schema: z.any()
        }
      }
    }
  }
});

export const calendarsByUid = new OpenAPIHono();

calendarsByUid.openapi(routeGETCalendars, async (c) => {
  const uid = c.req.param("uid");
  const data = await getCalendars(uid);
  return c.json(data, 200);
});

calendarsByUid.openapi(routePOSTCalendar, async (c) => {
  const uid = c.req.param("uid");
  const body = await c.req.json();
  const data = await createCalendar(uid, body);
  return c.json(data, 200);
});
