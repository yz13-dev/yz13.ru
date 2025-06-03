import { expire, redis } from "@/extensions/redis";
import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { makeUserObj } from "rest-api/lib/make-user-obj";
import type { UserObject } from "rest-api/types/user";
import { createAdminClient } from "yz13/supabase/admin";
import { createClient } from "yz13/supabase/server";

export const user = new Hono();

export const getUser = async (uid: string): Promise<UserObject | null> => {
  try {
    const key = `user:${uid}`;
    const cached = await redis.get<UserObject>(key);
    if (cached) return cached;
    const cookieStore = await cookies();
    const supabase = createAdminClient(cookieStore);
    const {
      data: { user },
      error,
    } = await supabase.auth.admin.getUserById(uid);
    if (error) return null;
    if (!user) return null;

    const userObj = makeUserObj(user);
    await redis.set(key, userObj, {
      ex: expire.day,
    });
    return userObj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

user.get("/:uid", async (c) => {
  const uid = c.req.param("uid");
  const user = await getUser(uid);
  return c.json(user);
});

user.patch("/:uid", async (c) => {
  const uid = c.req.param("uid");
  const key = `user:${uid}`;
  const body = await c.req.json();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const user = await getUser(uid);
  if (!user || user.id !== uid) return c.json(null);
  const {
    data: { user: updated },
    error,
  } = await supabase.auth.updateUser({
    ...body,
  });
  if (error) return c.json(error);
  if (!updated) return c.json(null);

  const userObj = makeUserObj(updated);
  await redis.set(key, userObj, {
    ex: expire.day,
  });
  return c.json(userObj);
});
