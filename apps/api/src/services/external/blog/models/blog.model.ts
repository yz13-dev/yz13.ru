import z from "zod";

/*
    attachments: Json[];
    authors: string[];
    categories: string[];
    date: string;
    id: string;
    pinned: boolean;
    summary: string | null;
    title: string;
*/

const blogAttachment = z.object({
  url: z.string(),
})

export const blogPostSchema = z.object({
  attachments: blogAttachment.array(),
  authors: z.array(z.string()),
  categories: z.array(z.string()),
  date: z.string(),
  id: z.string(),
  pinned: z.boolean(),
  summary: z.string().nullable(),
  title: z.string(),
})

export const blogDraftSchema = z.object({
  name: z.string(),
  id: z.string(),
  updated_at: z.string(),
  created_at: z.string(),
  last_accessed_at: z.string(),
})

export const blogPostArraySchema = z.array(blogPostSchema)
export const blogDraftArraySchema = z.array(blogDraftSchema)

export type BlogPost = z.infer<typeof blogPostSchema>
export type BlogPostArray = z.infer<typeof blogPostArraySchema>

export type BlogDraft = z.infer<typeof blogDraftSchema>
export type BlogDraftArray = z.infer<typeof blogDraftArraySchema>
