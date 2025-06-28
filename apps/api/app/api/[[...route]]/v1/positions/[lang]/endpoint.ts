import positionsMap from "@/const/positions";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";


const route = createRoute({
  path: "/{lang}",
  method: "get",
  request: {
    params: z.object({
      lang: z.enum(["en", "ru"])
    })
  },
  responses: {
    200: {
      description: "Successful",
      content: {
        "application/json": {
          schema: z.array(z.object({
            id: z.string(),
            label: z.string()
          }))
        }
      }
    }
  }
})

export const by_lang = new OpenAPIHono()

by_lang.openapi(route, async (c) => {

  const lang = c.req.param("lang") ?? "en";
  const localized = positionsMap[lang as keyof typeof positionsMap];

  return c.json(localized, 200);
})
