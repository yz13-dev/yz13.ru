import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getCountrySources } from "../../../actions";

const routeGETCountrySources = createRoute({
  method: "get",
  path: "/",
  request: {
    params: z.object({
      code: z.string()
    })
  },
  responses: {
    200: {
      description: "Country sources",
      content: {
        "application/json": {
          schema: z.array(z.any())
        }
      }
    }
  }
});

export const countrySources = new OpenAPIHono();

countrySources.openapi(routeGETCountrySources, async (c) => {
  try {
    const code = c.req.param("code");
    const data = await getCountrySources(code);
    return c.json(data, 200);
  } catch (error) {
    console.error(error);
    return c.json([], 200);
  }
}); 