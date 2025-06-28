import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { loginUser } from "../actions";

const routePOSTLogin = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            email: z.string().email(),
            password: z.string()
          })
        }
      }
    }
  },
  responses: {
    200: {
      description: "Login successful",
      content: {
        "application/json": {
          schema: z.object({
            user: z.any().optional(),
            error: z.string().optional()
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

export const login = new OpenAPIHono();

login.openapi(routePOSTLogin, async (c) => {
  try {
    const { email, password } = await c.req.json();

    const result = await loginUser(email, password);

    console.log(result)

    return c.json(result, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error }, 500);
  }
});
