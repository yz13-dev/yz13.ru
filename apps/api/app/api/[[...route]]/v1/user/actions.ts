import { expire, redis } from "@/extensions/redis";
import { wrapUser } from "@/lib/wrap-user";
import { UserObject } from "@/schemas/user";
import { createAdminClient } from "@yz13/supabase/admin";
import { cookies } from "next/headers";


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

    const userObj = wrapUser(user);
    await redis.set(key, userObj, {
      ex: expire.day,
    });
    return userObj;
  } catch (error) {
    console.log(error);
    return null;
  }
};
