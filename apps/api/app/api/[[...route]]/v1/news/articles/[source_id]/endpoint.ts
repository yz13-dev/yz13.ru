import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getArticlesBySource } from "../../actions";

const routeGETArticlesBySource = createRoute({
  method: "get",
  path: "/{source_id}",
  request: {
    params: z.object({
      source_id: z.string()
    })
  },
  responses: {
    200: {
      description: "Articles by source",
      content: {
        "application/json": {
          schema: z.array(z.any())
        }
      }
    }
  }
});

export const articlesBySource = new OpenAPIHono();

articlesBySource.openapi(routeGETArticlesBySource, async (c) => {
  try {
    const sourceId = c.req.param("source_id");
    const data = await getArticlesBySource(sourceId);
    return c.json(data, 200);
  } catch (error) {
    console.error(error);
    return c.json([], 200);
  }
}); 