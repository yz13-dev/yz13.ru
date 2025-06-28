import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getCategories } from "../actions";

const routeGETCategories = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      description: "Categories",
      content: {
        "application/json": {
          schema: z.array(z.string())
        }
      }
    }
  }
});

export const categories = new OpenAPIHono();

categories.openapi(routeGETCategories, async (c) => {
  try {
    const data = await getCategories();
    return c.json(data, 200);
  } catch (error) {
    console.error(error);
    return c.json([], 200);
  }
}); 