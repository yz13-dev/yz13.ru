import z from "zod";

export const tagSchema = z.object({
  created_at: z.string(),
  id: z.string(),
  label: z.string(),
})

export const tagArraySchema = z.array(tagSchema)

export const newTagSchema = z.object({
  label: z.string(),
})

export const updateTagSchema = z.object({
  label: z.string().optional(),
})

export type PinsTag = z.infer<typeof tagSchema>
