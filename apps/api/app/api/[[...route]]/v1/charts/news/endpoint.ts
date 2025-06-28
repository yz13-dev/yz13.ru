import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getNewsCountForSixMonths } from "../actions";

const routeGETNews = createRoute({
  method: "get",
  path: "/news",
  responses: {
    200: {
      description: "News count for 6 months",
      content: {
        "application/json": {
          schema: z.any()
        }
      }
    }
  }
});

export const news = new OpenAPIHono();

news.openapi(routeGETNews, async (c) => {
  const count = await getNewsCountForSixMonths();
  return c.json(count);
}); 