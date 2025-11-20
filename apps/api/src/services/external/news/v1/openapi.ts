import { createRoute } from "@hono/zod-openapi"
import z from "zod"
import { newsSchemaArray } from "../models/news.model"


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

export const getRecentArticlesRoute = createRoute({
  method: "get",
  path: "/recent",
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: newsSchemaArray
        }
      }
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: newsSchemaArray
        }
      }
    }
  },
})


export const getLastArticlesRoute = createRoute({
  method: "get",
  path: "/last",
  request: {
    query: z.object({
      offset: z.string().optional(),
    })
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: newsSchemaArray
        }
      }
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: newsSchemaArray
        }
      }
    }
  },
})
