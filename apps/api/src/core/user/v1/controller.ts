import type { Context } from "hono";
import { getSupabase } from "../../../middlewares/admin.supabase.middleware";
import { wrapUser } from "../../../utils/wrap-user";


export const getUserById = async (c: Context) => {

  try {
    const uid = c.req.param("uid")

    const supabase = getSupabase(c);

    const { data: { user }, error } = await supabase.auth.admin.getUserById(uid)

    if (error) {
      console.log(error)
      return c.json(null, 502)
    }

    if (!user) return c.json(null, 200)

    return c.json(wrapUser(user), 200)
  } catch (error) {
    console.log(error)
    return c.json(null, 502)
  }
}
