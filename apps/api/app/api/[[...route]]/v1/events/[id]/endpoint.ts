import { calendarEventsSchema, calendarEventsUpdateSchema } from "@/schemas/calendar-events"
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi"
import { deleteEvent, getEventById, updateEvent } from "../actions"

const routeGETEvent = createRoute({
  method: "get",
  path: "/{id}",
  request: {
    params: z.object({
      id: z.string()
    })
  },
  responses: {
    200: {
      description: "Get event by id",
      content: {
        "application/json": {
          schema: calendarEventsSchema.nullable()
        }
      }
    },
    404: {
      description: "Event not found",
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

const routePATCHEvent = createRoute({
  method: "patch",
  path: "/{id}",
  request: {
    params: z.object({
      id: z.string()
    }),
    body: {
      content: {
        "application/json": {
          schema: calendarEventsUpdateSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "Update event",
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

const routeDELETEEvent = createRoute({
  method: "delete",
  path: "/{id}",
  request: {
    params: z.object({
      id: z.string()
    })
  },
  responses: {
    200: {
      description: "Delete event",
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

export const eventById = new OpenAPIHono()

eventById.openapi(routeGETEvent, async (c) => {
  const id = c.req.param("id")
  const data = await getEventById(id)
  if (!data) return c.json({ error: "Event not found" }, 404)
  return c.json(data, 200)
})

eventById.openapi(routePATCHEvent, async (c) => {
  const id = c.req.param("id")
  const body = await c.req.json()
  const data = await updateEvent(id, body)
  if (!data) return c.json({ error: "Failed to update event" }, 400)
  return c.json(data, 200)
})

eventById.openapi(routeDELETEEvent, async (c) => {
  const id = c.req.param("id")
  const data = await deleteEvent(id)
  if (!data) return c.json({ error: "Failed to delete event" }, 400)
  return c.json(data, 200)
}) 