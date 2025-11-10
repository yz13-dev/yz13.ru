import z from "zod"
import { profileSchema } from "../../../../core/user/models/profile.model"

export const pinSchema = z.object({
  board_id: z.string().nullish(),
  created_at: z.string(),
  description: z.string().nullish(),
  id: z.string(),
  name: z.string(),
  source_url: z.string().nullish(),
  tags: z.array(z.string()).nullish(),
  updated_at: z.string().nullish(),
  owner: profileSchema,
  attachment: z.string().nullable(),
  width: z.number().nullish(),
  height: z.number().nullish(),
  thumbnail: z.string().nullable(),
})

export const pinArraySchema = z.array(pinSchema)

export const newPinSchema = pinSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  owner: true,
})

export const updatePinSchema = pinSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  owner: true,
})

export type Pin = z.infer<typeof pinSchema>
export type UpdatePin = z.infer<typeof updatePinSchema>
