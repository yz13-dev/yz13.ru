import { publicationsSchema } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getPublicationById } from "../actions";

const routeGETStoreById = createRoute({
  method: "get",
  path: "/{id}",
  request: {
    params: z.object({
      id: z.string()
    })
  },
  responses: {
    200: {
      description: "Get publication by id",
      content: {
        "application/json": {
          schema: publicationsSchema.nullable()
        }
      }
    }
  }
});

export const storeById = new OpenAPIHono();

storeById.openapi(routeGETStoreById, async (c) => {
  const id = c.req.param("id");
  const data = await getPublicationById(id);
  return c.json(data, 200);
});
