import { newsSourcesArraySchema } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getNewsSources } from "../actions";

const routeGETNewsSources = createRoute({
  method: "get",
  path: "/",
  request: {
    query: z.object({
      country_code: z.string().optional()
    })
  },
  responses: {
    200: {
      description: "News sources",
      content: {
        "application/json": {
          schema: newsSourcesArraySchema
        }
      }
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: newsSourcesArraySchema
        }
      }
    }
  }
});

export const newsSources = new OpenAPIHono();

newsSources.openapi(routeGETNewsSources, async (c) => {
  try {
    const countryCode = c.req.query("country_code");
    const data = await getNewsSources(countryCode);
    return c.json(data, 200);
  } catch (error) {
    console.error(error);
    return c.json([], 500);
  }
});
