import { expire, redis } from "@/extensions/redis";
import { wrapUser } from "@/lib/wrap-user";
import { userSchema, userUpdateSchema } from "@/schemas/user";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";
import { getUser } from "../actions";



const routeGET = createRoute({
  method: "get",
  path: "/{uid}",
  request: {
    params: z.object({
      uid: z.string()
    }),
  },
  responses: {
    200: {
      description: "Successfully updated user",
      content: {
        "application/json": {
          schema: userSchema.nullable()
        }
      }
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
})

const routePATCH = createRoute({
  method: "patch",
  path: "/{uid}",
  request: {
    params: z.object({
      uid: z.string()
    }),
    body: {
      content: {
        "application/json": {
          schema: userUpdateSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "Successfully updated user",
      content: {
        "application/json": {
          schema: userSchema
        }
      }
    },
    400: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
})

export const user = new OpenAPIHono()

user.openapi(routeGET, async (c) => {
  try {
    const uid = c.req.param("uid");
    const user = await getUser(uid);
    return c.json(user, 200);
  } catch (error) {
    console.error(error);
    return c.json(null, 500);
  }
})

user.openapi(routePATCH, async (c) => {

  const uid = c.req.param("uid");
  const key = `user:${uid}`;


  const body = await c.req.json();

  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const user = await getUser(uid);

    if (!user || user.id !== uid) return c.json(null, 400);

    const {
      data: { user: updated },
      error,
    } = await supabase.auth.updateUser({
      ...body,
    });

    if (error) {
      console.error(error);
      return c.json(null, 500);
    }
    if (!updated) return c.json(null, 400);

    const userObj = wrapUser(updated);
    await redis.set(key, userObj, {
      ex: expire.day,
    });

    return c.json(userObj, 200);
  } catch (error) {
    console.error(error);
    return c.json(null, 500);
  }
})
