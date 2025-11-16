import { Context } from "hono";
import { getSupabase } from "../../../../middlewares/admin.supabase.middleware";




export const TrackClick = async (c: Context) => {

  const path = c.req.query("path")
  const domain = c.req.query("domain")

  if (!path) return c.json(null, 400);

  try {

    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("clicks")
      .insert({
        path,
        domain
      })
      .select()
      .maybeSingle()

    if (error) return c.json(null, 500);

    return c.json(data, 200);

  } catch (error) {
    console.log(error)
    return c.json(null, 500);
  }
}
