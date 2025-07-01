import { userSchema } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getCurrentUser } from "../actions";

const routeGETCurrent = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      description: "Current user",
      content: {
        "application/json": {
          schema: userSchema.nullable()
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

export const current = new OpenAPIHono();

current.openapi(routeGETCurrent, async (c) => {

  console.log(c.req.raw)

  try {
    const user = await getCurrentUser();
    return c.json(user, 200);

  } catch (error) {
    console.error(error);
    return c.json(null, 500);
  }
});
