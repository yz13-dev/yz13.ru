import { createRoute } from "@hono/zod-openapi";
import z from "zod";
import { ClicksSchema } from "../models/clicks.model";



export const TrackClickRoute = createRoute({
  path: "/track",
  method: "post",
  request: {
    query: z.object({
      domain: z.string().optional(),
      from: z.string().optional(),
      path: z.string()
    })
  },
  responses: {
    200: {
      description: "Track a click",
      content: {
        "application/json": {
          schema: ClicksSchema.nullable()
        }
      }
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.null()
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
