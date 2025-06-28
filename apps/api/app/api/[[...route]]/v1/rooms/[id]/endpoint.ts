import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getRoom } from "../actions";

const routeGETRoom = createRoute({
  method: "get",
  path: "/{id}",
  request: {
    params: z.object({
      id: z.string()
    }),
  },
  responses: {
    200: {
      description: "Room data",
      content: {
        "application/json": {
          schema: z.any()
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

export const room = new OpenAPIHono();

room.openapi(routeGETRoom, async (c) => {
  try {
    const id = c.req.param("id");
    const result = await getRoom(id);
    
    if (result.error) {
      return c.json({ error: result.error }, 500);
    }
    
    return c.json(result.data, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error }, 500);
  }
}); 