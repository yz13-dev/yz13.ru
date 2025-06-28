import { expire, redis } from "@/extensions/redis";
import { pricingArraySchema, shortPricingArraySchema } from "@/schemas";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";



const route = createRoute({
  path: "/",
  method: "get",
  responses: {
    200: {
      description: "Successful",
      content: {
        "application/json": {
          schema: pricingArraySchema
        }
      }
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: shortPricingArraySchema
        }
      }
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: shortPricingArraySchema
        }
      }
    }
  }
})

export const short = new OpenAPIHono()

short.openapi(route, async (c) => {
  const key = "pricing/short";
  try {
    const cache = await redis.get<any[]>(key);
    if (cache) return c.json(cache, 200);
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("pricing")
      .select("id, price, created_at, name, description, type");

    if (error) return c.json([], 400);

    if (data.length !== 0) await redis.set(key, JSON.stringify(data), { ex: expire.day });

    return c.json(data, 200);

  } catch (error) {

    console.log(error);
    return c.json([], 500);

  }
})
