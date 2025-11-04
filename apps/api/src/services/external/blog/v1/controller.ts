import matter from "gray-matter";
import type { Context } from "hono";
import { getSupabase } from "../../../../middlewares/admin.supabase.middleware";
import { BlogPost, blogPostSchema } from "../models/blog.model";



export const getPosts = async (c: Context) => {
  try {

    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("blog")
      .select("*")

    if (error) {
      console.error(error)
      return c.json([], 502)
    }

    const posts = (data ?? []) as unknown as BlogPost[]

    return c.json(posts, 200)
  } catch (error) {
    console.error(error);
    return c.json([], 502)
  }
}


export const getDrafts = async (c: Context) => {
  try {

    const supabase = getSupabase(c);

    const storage = supabase.storage;

    const bucket = storage.from("blog")

    const { data, error } = await bucket.list("drafts");

    const posts = (data ?? []).map(post => ({
      name: post.name,
      id: post.id,
      updated_at: post.updated_at,
      created_at: post.created_at,
      last_accessed_at: post.last_accessed_at,
    }))

    if (error) {
      console.error(error)
      return c.json([], 502)
    }

    return c.json(posts, 200)
  } catch (error) {
    console.error(error);
    return c.json([], 502)
  }
}

export const uploadPost = async (c: Context) => {
  try {
    const body = await c.req.parseBody();

    const file = body.file as string;

    const name = c.req.query("name");

    const parsed = matter(file)

    const supabase = getSupabase(c);
    const storage = supabase.storage;
    const bucket = storage.from("blog")

    const filename = makeName(name, "post")
    const path = `published/${filename}`

    const { data, error } = await bucket
      .upload(path, file, { upsert: true });

    if (error) {
      console.error(error)
      return c.json(null, 502)
    }

    await createBlogRow(c, filename, parsed.data as BlogPost);

    return c.json({
      id: data.id,
      path: data.path,
      fullPath: data.fullPath
    }, 200)
  } catch (error) {
    console.error(error);
    return c.json(null, 502)
  }
}

export const createBlogRow = async (c: Context, filename: string, blog: BlogPost) => {
  try {
    blogPostSchema.safeParse(blog);

    const filenameAsId = filename.replace(".md", "");

    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("blog")
      .insert({
        ...blog,
        id: filenameAsId
      })
      .select("*")
      .maybeSingle();

    if (error) {
      console.error(error)
      return null
    }

    return data;

  } catch (error) {
    console.error(error);
    return null;
  }
}


export const uploadDraft = async (c: Context) => {
  try {
    const body = await c.req.parseBody();

    const file = body.file as string;

    const name = c.req.query("name");

    const supabase = getSupabase(c);
    const storage = supabase.storage;
    const bucket = storage.from("blog");

    const filename = makeName(name, "draft")
    const path = `drafts/${filename}`

    const { data, error } = await bucket.upload(path, file, { upsert: true });

    if (error) {
      console.error(error)
      return c.json(null, 502)
    }

    return c.json({
      id: data.id,
      path: data.path,
      fullPath: data.fullPath
    }, 200)
  } catch (error) {
    console.error(error);
    return c.json(null, 502)
  }
}


const makeName = (name?: string, postfix?: string) => {
  const fallbackName = postfix ? postfix : "item"
  return name ? `${name}.md` : `new-${fallbackName}.md`
}
