import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getDefaultCalendar } from "../../../actions";

const routeGETDefault = createRoute({
  method: "get",
  path: "/user/{uid}/default",
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
          schema: z.any()
        }
      }
    }
  }
});

export const defaultCalendar = new OpenAPIHono();

defaultCalendar.openapi(routeGETDefault, async (c) => {
  const uid = c.req.param("uid");
  const data = await getDefaultCalendar(uid);
  return c.json(data, 200);
}); 