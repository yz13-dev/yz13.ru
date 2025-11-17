import { createRoute } from "@hono/zod-openapi";
import z from "zod";
import { linkSchema } from "../models/links.model";


export const getLinkRoute = createRoute({
  method: "get",
  path: "/{id}",
  request: {
    params: z.object({
      id: z.string()
    })
  },
  responses: {
    200: {
      description: "Get link",
      content: {
        "application/json": {
          schema: linkSchema.nullable()
        }
      }
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
})
