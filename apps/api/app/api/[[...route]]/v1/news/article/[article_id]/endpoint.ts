import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getArticleById } from "../../actions";

const routeGETArticleById = createRoute({
  method: "get",
  path: "/{article_id}",
  request: {
    params: z.object({
      article_id: z.string()
    })
  },
  responses: {
    200: {
      description: "Article by ID",
      content: {
        "application/json": {
          schema: z.any().nullable()
        }
      }
    }
  }
});

export const article = new OpenAPIHono();

article.openapi(routeGETArticleById, async (c) => {
  try {
    const articleId = c.req.param("article_id");
    const data = await getArticleById(articleId);
    return c.json(data, 200);
  } catch (error) {
    console.error(error);
    return c.json(null, 200);
  }
}); 