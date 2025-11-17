import type { Context } from "hono";
import { getSupabase } from "../../../../middlewares/supabase.middleware";





export const getLink = async (c: Context) => {
  const id = c.req.param("id");
  try {

    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("id", id)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.warn(error)
      return c.json(null, 500)
    }

    return c.json(data, 200)

  } catch (error) {
    console.warn(error)

    return c.json(null, 500)
  }
}
