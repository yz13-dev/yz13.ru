import { newsInsertSchema, newsSchema } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { createArticle } from "../../actions";

const routePOSTNewArticle = createRoute({
  method: "post",
  path: "/",
  request: {
    headers: z.object({
      authorization: z.string()
    }),
    body: {
      content: {
        "application/json": {
          schema: newsInsertSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "Article created",
      content: {
        "application/json": {
          schema: newsSchema.nullable()
        }
      }
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: z.null()
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

export const newArticle = new OpenAPIHono();

newArticle.openapi(routePOSTNewArticle, async (c) => {
  try {
    const token = c.req.header("Authorization");
    if (!token) {
      console.log("no token");
      return c.json(null, 401);
    }

    const article = await c.req.json();
    const result = await createArticle(article, token);

    if (result.error) {
      console.log(result.error);
      return c.json(null, 401);
    }

    return c.json(result.data ?? null, 200);
  } catch (error) {
    console.error(error);
    return c.json(null, 500);
  }
});
