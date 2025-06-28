import positionsMap from "@/const/positions";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";


const route = createRoute({
  path: "/{positionId}",
  method: "get",
  request: {
    params: z.object({
      lang: z.enum(["en", "ru"]),
      positionId: z.string()
    })
  },
  responses: {
    200: {
      description: "Successful",
      content: {
        "application/json": {
          schema: z.object({
            id: z.string(),
            label: z.string()
          })
        }
      }
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
})

export const by_position = new OpenAPIHono()

by_position.openapi(route, async (c) => {

  const lang = c.req.param("lang") ?? "en";
  const positionId = c.req.param("positionId");
  if (!positionId) return c.json(null, 400);
  const localized = positionsMap[lang as keyof typeof positionsMap];
  const position = localized.find((p) => p.id === positionId);
  return c.json(position);

})
