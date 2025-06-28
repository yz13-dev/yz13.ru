import { calendarScheduleSchema } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getSchedule } from "../actions";

const routeGETSchedule = createRoute({
  method: "get",
  path: "/{uid}",
  request: {
    params: z.object({
      uid: z.string()
    })
  },
  responses: {
    200: {
      description: "Get schedule by uid",
      content: {
        "application/json": {
          schema: calendarScheduleSchema
        }
      }
    }
  }
});

export const scheduleByUid = new OpenAPIHono();

scheduleByUid.openapi(routeGETSchedule, async (c) => {
  const uid = c.req.param("uid");
  const data = await getSchedule(uid);
  return c.json(data, 200);
});
