import z from "zod";
import { profileSchema } from "../../../../core/user/models/profile.model";
import { boardSchema } from "./boards.model";
import { pinSchema } from "./pins.model";


export const minimalAnchorSchema = z.object({
  board_id: z.string(),
  created_at: z.string(),
  pin_id: z.string(),
  user_id: z.string(),
})

export const anchorSchema = z.object({
  pin: pinSchema,
  board: boardSchema,
  owner: profileSchema
})


export const anchorArraySchema = z.array(anchorSchema)
export const minimalAnchorArraySchema = z.array(minimalAnchorSchema)

export type Anchor = z.infer<typeof anchorSchema>
export type AnchorArray = z.infer<typeof anchorArraySchema>
export type MinimalAnchor = z.infer<typeof minimalAnchorSchema>
export type MinimalAnchorArray = z.infer<typeof minimalAnchorArraySchema>
