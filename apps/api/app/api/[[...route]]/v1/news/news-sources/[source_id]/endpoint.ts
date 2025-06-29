import { newsSourcesSchema } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getNewsSourceById } from "../../actions";

const routeGETNewsSourceById = createRoute({
  method: "get",
  path: "/{source_id}",
  request: {
    params: z.object({
      source_id: z.string()
    })
  },
  responses: {
    200: {
      description: "News source by ID",
      content: {
        "application/json": {
          schema: newsSourcesSchema.nullable()
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
    },
  }
});

export const newsSource = new OpenAPIHono();

newsSource.openapi(routeGETNewsSourceById, async (c) => {
  try {
    const sourceId = c.req.param("source_id");
    const data = await getNewsSourceById(sourceId);
    return c.json(data, 200);
  } catch (error) {
    console.error(error);
    return c.json(null, 500);
  }
});
