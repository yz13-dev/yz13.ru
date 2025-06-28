import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getCalendar, updateCalendar, deleteCalendar } from "../actions";

const routeGETCalendar = createRoute({
  method: "get",
  path: "/{id}",
  request: {
    params: z.object({
      id: z.string()
    })
  },
  responses: {
    200: {
      description: "Get calendar by id",
      content: {
        "application/json": {
          schema: z.any()
        }
      }
    }
  }
});

const routePATCHCalendar = createRoute({
  method: "patch",
  path: "/{id}",
  request: {
    params: z.object({
      id: z.string()
    }),
    body: {
      content: {
        "application/json": {
          schema: z.any()
        }
      }
    }
  },
  responses: {
    200: {
      description: "Update calendar",
      content: {
        "application/json": {
          schema: z.any()
        }
      }
    }
  }
});

const routeDELETECalendar = createRoute({
  method: "delete",
  path: "/{id}",
  request: {
    params: z.object({
      id: z.string()
    })
  },
  responses: {
    200: {
      description: "Delete calendar",
      content: {
        "application/json": {
          schema: z.any()
        }
      }
    }
  }
});

export const calendarById = new OpenAPIHono();

calendarById.openapi(routeGETCalendar, async (c) => {
  const id = c.req.param("id");
  const data = await getCalendar(id);
  return c.json(data, 200);
});

calendarById.openapi(routePATCHCalendar, async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const data = await updateCalendar(id, body);
  return c.json(data, 200);
});

calendarById.openapi(routeDELETECalendar, async (c) => {
  const id = c.req.param("id");
  const data = await deleteCalendar(id);
  return c.json(data, 200);
}); 