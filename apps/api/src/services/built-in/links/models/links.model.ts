import z from "zod";




export const linkSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  to: z.string(),
})

export const NewLinkSchema = linkSchema.omit({
  id: true,
  created_at: true,
})
