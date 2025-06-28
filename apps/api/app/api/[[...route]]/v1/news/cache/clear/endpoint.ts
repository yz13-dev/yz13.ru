import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { clearCache } from "../../actions";

const routePOSTClearCache = createRoute({
  method: "post",
  path: "/",
  responses: {
    200: {
      description: "Cache cleared",
      content: {
        "text/plain": {
          schema: z.string()
        }
      }
    }
  }
});

export const clearCacheEndpoint = new OpenAPIHono();

clearCacheEndpoint.openapi(routePOSTClearCache, async (c) => {
  try {
    const result = await clearCache();
    return c.text(result.toString(), 200);
  } catch (error) {
    console.error(error);
    return c.text("false", 200);
  }
}); 