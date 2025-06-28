import { calendarEventsInsertSchema, calendarEventsSchema } from "@/schemas/calendar-events"
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi"
import { createEvent } from "./actions"

const routePOSTEvent = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: calendarEventsInsertSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "Event created successfully",
      content: {
        "application/json": {
          schema: calendarEventsSchema.nullable()
        }
      }
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string()
          })
        }
      }
    }
  }
})

export const events = new OpenAPIHono()

events.openapi(routePOSTEvent, async (c) => {
  const body = await c.req.json()
  if (!body) return c.json({ error: "No body provided" }, 400)
  
  const data = await createEvent(body)
  if (!data) return c.json({ error: "Failed to create event" }, 400)
  return c.json(data, 200)
}) 