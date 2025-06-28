import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { createRoom } from "../actions";

const routePOSTNew = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            max_members: z.number(),
            name: z.string(),
            public: z.boolean(),
            owner: z.string()
          })
        }
      }
    }
  },
  responses: {
    200: {
      description: "Room created successfully",
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
          schema: z.null()
        }
      }
    }
  }
});

export const newRoom = new OpenAPIHono();

newRoom.openapi(routePOSTNew, async (c) => {
  try {
    const body = await c.req.json();
    const result = await createRoom(
      body.max_members,
      body.name,
      body.public,
      body.owner
    );
    
    if (result.error) {
      return c.json(null, 500);
    }
    
    return c.json(result.data, 200);
  } catch (error) {
    console.error(error);
    return c.json(null, 500);
  }
}); 