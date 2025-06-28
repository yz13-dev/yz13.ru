import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

const routePATCHRepatch = createRoute({
  method: "patch",
  path: "/",
  responses: {
    200: {
      description: "Repatch status",
      content: {
        "application/json": {
          schema: z.object({
            status: z.string()
          })
        }
      }
    }
  }
});

export const repatch = new OpenAPIHono();

repatch.openapi(routePATCHRepatch, async (c) => {
  return c.json({ status: "ok" }, 200);
}); 