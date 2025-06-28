import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { logoutUser } from "../actions";

const routePOSTLogout = createRoute({
  method: "post",
  path: "/",
  responses: {
    200: {
      description: "Logout successful",
      content: {
        "application/json": {
          schema: z.object({
            status: z.boolean().optional(),
            error: z.any().optional()
          })
        }
      }
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: z.object({
            error: z.any()
          })
        }
      }
    }
  }
});

export const logout = new OpenAPIHono();

logout.openapi(routePOSTLogout, async (c) => {
  try {
    const result = await logoutUser();
    return c.json(result, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error }, 500);
  }
}); 