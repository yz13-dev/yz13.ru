import { newsArraySchema } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getCountryArticles } from "../../../actions";

const routeGETCountryArticles = createRoute({
  method: "get",
  path: "/",
  request: {
    params: z.object({
      code: z.string().min(1)
    }),
    query: z.object({
      offset: z.string().optional(),
      limit: z.string().optional(),
      date: z.string().optional()
    })
  },
  responses: {
    200: {
      description: "Country articles",
      content: {
        "application/json": {
          schema: newsArraySchema
        }
      }
    }
  }
});

export const countryArticles = new OpenAPIHono();

countryArticles.openapi(routeGETCountryArticles, async (c) => {

  const limitQuery = c.req.query("limit");

  try {
    const code = c.req.param("code");
    const offset = Number.parseInt(c.req.query("offset") || "0");
    const limit = limitQuery ? Number.parseInt(limitQuery) : undefined;
    const date = c.req.query("date");

    const data = await getCountryArticles(code, offset, limit, date);
    return c.json(data, 200);
  } catch (error) {
    console.error(error);
    return c.json([], 200);
  }
});
