import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { userSchema } from "../models/user.model";

export const getUserByIdRoute = createRoute({
  method: "get",
  path: "/{uid}",
  request: {
    params: z.object({
      uid: z.string(),
    }),
  },
  responses: {
    200: {
      description: "Current user information",
      content: {
        "application/json": {
          schema: userSchema.nullable(),
        },
      },
    },
    502: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.null(),
        },
      },
    },
  },
});
