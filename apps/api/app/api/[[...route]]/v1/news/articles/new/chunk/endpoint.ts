import { newsArraySchema, NewsInsert, newsInsertSchemaArray } from "@/schemas";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { createArticle } from "../../../actions";

const routePOSTNewArticle = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: newsInsertSchemaArray
        }
      }
    }
  },
  responses: {
    200: {
      description: "Articles created",
      content: {
        "application/json": {
          schema: newsArraySchema
        }
      }
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: newsArraySchema
        }
      }
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: newsArraySchema
        }
      }
    }
  }
});

export const newArticleChunk = new OpenAPIHono();

newArticleChunk.openapi(routePOSTNewArticle, async (c) => {
  try {
    const articles: NewsInsert[] = await c.req.json();

    const result = await Promise.all(articles.map(article => createArticle(article)));

    const filtered = result.filter(article => !!article);

    return c.json(filtered, 200);
  } catch (error) {
    console.error(error);
    return c.json([], 500);
  }
});
