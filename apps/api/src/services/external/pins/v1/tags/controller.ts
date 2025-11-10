import { Context } from "hono";
import { getSupabase } from "../../../../../middlewares/supabase.middleware";
import { translit } from "../../../../../utils/translit/ru";



export const getTags = async (c: Context) => {
  const search = c.req.query("search")
  try {

    const supabase = getSupabase(c);

    if (search) {

      const { data, error } = await supabase
        .from("pins_tags")
        .select("*")
        .order("created_at", { ascending: false })
        .textSearch("label", search)

      if (error) {
        console.log(error)
        return c.json([], 500)
      }
      return c.json(data ?? [], 200)

    }

    const { data, error } = await supabase
      .from("pins_tags")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.log(error)
      return c.json([], 500)
    }
    return c.json(data ?? [], 200)

  } catch (error) {
    console.log(error)
    return c.json([], 502)
  }
}

export const getSearchTags = async (c: Context) => {
  const q = c.req.query("q")
  try {
    if (!q) return c.json([], 400);

    const query = translit(q);

    const supabase = getSupabase(c);
    const { data, error } = await supabase
      .from("pins_tags")
      .select("*")
      .order("created_at", { ascending: false })
      .ilike("label", `%${query}%`)
    // .textSearch("label", q, { type: "websearch", config: "english" })

    if (error) {
      console.log(error)
      return c.json([], 500)
    }

    return c.json(data ?? [], 200)

  } catch (error) {
    console.log(error)
    return c.json([], 502)
  }
}

export const getTagsFromArray = async (c: Context) => {
  const tagsQuery = c.req.query("tags")
  const tags = (tagsQuery ?? "").split(",")
  try {
    const supabase = getSupabase(c);
    const { data, error } = await supabase
      .from("pins_tags")
      .select("*")
      .order("created_at", { ascending: false })
      .in("id", tags)

    if (error) {
      console.log(error)
      return c.json([], 500)
    }
    return c.json(data)
  } catch (error) {
    console.log(error)
    return c.json([], 502)
  }
}

export const getTag = async (c: Context) => {
  const tagId = c.req.query("id")
  try {
    if (!tagId) return c.json(null, 400)
    const supabase = getSupabase(c);
    const { data, error } = await supabase
      .from("pins_tags")
      .select("*")
      .eq("id", tagId)
      .maybeSingle()

    if (error) {
      console.log(error)
      return c.json(null, 500)
    }
    return c.json(data, 200)
  } catch (error) {
    console.log(error)
    return c.json(null, 502)
  }
}

export const createTag = async (c: Context) => {
  const body = await c.req.json()
  try {

    const supabase = getSupabase(c);

    const id = translit(body.label).replaceAll(" ", "-").toLowerCase();

    const { data, error } = await supabase
      .from("pins_tags")
      .insert({
        ...body,
        id
      })
      .select()
      .maybeSingle()

    if (error) {
      console.log(error)
      return c.json(null, 500)
    }
    return c.json(data, 200)

  } catch (error) {
    console.log(error)
    return c.json(null, 502)
  }
}


export const updateTag = async (c: Context) => {
  const body = await c.req.json()
  const tagId = c.req.query("id")
  try {
    if (!tagId) return c.json(null, 400)

    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("pins_tags")
      .update(body)
      .eq("id", tagId)
      .select()
      .maybeSingle()

    if (error) {
      console.log(error)
      return c.json(null, 500)
    }
    return c.json(data, 200)

  } catch (error) {
    console.log(error)
    return c.json(null, 502)
  }
}

export const deleteTag = async (c: Context) => {
  const tagId = c.req.query("id")
  try {
    if (!tagId) return c.json(null, 400)

    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("pins_tags")
      .delete()
      .eq("id", tagId)
      .select()
      .maybeSingle()

    if (error) {
      console.log(error)
      return c.json(null, 500)
    }
    return c.json(data, 200)

  } catch (error) {
    console.log(error)
    return c.json(null, 502)
  }
}
