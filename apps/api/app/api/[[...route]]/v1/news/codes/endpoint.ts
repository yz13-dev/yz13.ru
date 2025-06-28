import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getCountryCodes } from "../actions";

const routeGETCodes = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      description: "Country codes",
      content: {
        "application/json": {
          schema: z.array(z.string())
        }
      }
    }
  }
});

export const codes = new OpenAPIHono();

codes.openapi(routeGETCodes, async (c) => {
  try {
    const data = await getCountryCodes();
    return c.json(data, 200);
  } catch (error) {
    console.error(error);
    return c.json([], 200);
  }
}); 