import { calendarSchema } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getDefaultCalendar } from "../../../actions";

const routeGETDefault = createRoute({
  method: "get",
  path: "/default",
  request: {
    params: z.object({
      uid: z.string()
    })
  },
  responses: {
    200: {
      description: "Get default calendar by uid",
      content: {
        "application/json": {
          schema: calendarSchema.nullable()
        }
      }
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
});

export const defaultCalendar = new OpenAPIHono();

defaultCalendar.openapi(routeGETDefault, async (c) => {
  const uid = c.req.param("uid");
  if (!uid) return c.json(null, 400);
  const data = await getDefaultCalendar(uid);
  return c.json(data, 200);
});
