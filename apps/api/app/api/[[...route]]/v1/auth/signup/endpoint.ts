import { userInsertSchema, userSchema } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { signupUser } from "../actions";

const routePOSTSignup = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: userInsertSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "Signup successful",
      content: {
        "application/json": {
          schema: userSchema
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

export const signup = new OpenAPIHono();

signup.openapi(routePOSTSignup, async (c) => {
  try {
    const { email, password } = await c.req.json();
    const result = await signupUser(email, password);

    if (!result.user) {
      return c.json(null, 400);
    }

    const user = result.user;

    return c.json(user, 200);
  } catch (error) {
    console.error(error);
    return c.json(null, 500);
  }
});
