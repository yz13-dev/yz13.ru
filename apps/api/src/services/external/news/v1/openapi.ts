import { createRoute } from "@hono/zod-openapi"
import z from "zod"


export const indexNewsArticlesRoute = createRoute({
  method: "post",
  path: "/index",
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: z.object({
            count: z.number()
          })
        }
      }
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: z.object({
            count: z.number()
          })
        }
      }
    }
  }
})
