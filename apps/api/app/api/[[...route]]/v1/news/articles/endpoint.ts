import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getArticles } from "../actions";

const routeGETArticles = createRoute({
  method: "get",
  path: "/",
  request: {
    query: z.object({
      offset: z.string().optional()
    })
  },
  responses: {
    200: {
      description: "Articles",
      content: {
        "application/json": {
          schema: z.array(z.any())
        }
      }
    }
  }
});

export const articles = new OpenAPIHono();

articles.openapi(routeGETArticles, async (c) => {
  try {
    const offset = Number.parseInt(c.req.query("offset") || "0");
    const data = await getArticles(offset);
    return c.json(data, 200);
  } catch (error) {
    console.error(error);
    return c.json([], 200);
  }
}); 