import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { signupUser } from "../actions";

const routePOSTSignup = createRoute({
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
      description: "Signup successful",
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

export const signup = new OpenAPIHono();

signup.openapi(routePOSTSignup, async (c) => {
  try {
    const { email, password } = await c.req.json();
    const result = await signupUser(email, password);
    return c.json(result, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error }, 500);
  }
}); 