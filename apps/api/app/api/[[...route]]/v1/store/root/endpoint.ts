import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getPublications, createPublication } from "../actions";

const routeGETStore = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      description: "Get publications",
      content: {
        "application/json": {
          schema: z.any()
        }
      }
    }
  }
});

const routePOSTStore = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.any()
        }
      }
    }
  },
  responses: {
    200: {
      description: "Create publication",
      content: {
        "application/json": {
          schema: z.any()
        }
      }
    }
  }
});

export const root = new OpenAPIHono();

root.openapi(routeGETStore, async (c) => {
  const data = await getPublications();
  return c.json(data, 200);
});

root.openapi(routePOSTStore, async (c) => {
  const body = await c.req.json();
  const data = await createPublication(body);
  return c.json(data, 200);
}); 