import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getCurrentSession } from "../../actions";

const routeGETSession = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      description: "Current session",
      content: {
        "application/json": {
          schema: z.any().nullable()
        }
      }
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
});

export const session = new OpenAPIHono();

session.openapi(routeGETSession, async (c) => {
  try {
    const session = await getCurrentSession();
    return c.json(session, 200);
  } catch (error) {
    console.error(error);
    return c.json(null, 500);
  }
}); 