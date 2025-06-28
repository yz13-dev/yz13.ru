import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
// import { getAvailability } from "../../actions";

const routeGETAvailable = createRoute({
  method: "get",
  path: "/available",
  request: {
    params: z.object({
      uid: z.string()
    }),
    query: z.object({
      date: z.string().optional()
    })
  },
  responses: {
    200: {
      description: "Get availability by uid and date",
      content: {
        "application/json": {
          schema: z.any()
        }
      }
    }
  }
});

export const available = new OpenAPIHono();

available.openapi(routeGETAvailable, async (c) => {
  // Здесь должна быть логика получения доступности
  return c.json({}, 200);
});
