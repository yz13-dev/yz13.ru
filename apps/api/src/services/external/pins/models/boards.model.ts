import z from "zod";

export const boardSchema = z.object({
  authors: z.array(z.string()),
  created_at: z.string(),
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  public: z.boolean(),
  updated_at: z.string().nullish(),
})

export const boardArraySchema = z.array(boardSchema)

export const newBoardSchema = z.object({
  authors: z.array(z.string()),
  name: z.string(),
  owner: z.string(),
  public: z.boolean(),
})

export const updateBoardSchema = z.object({
  authors: z.array(z.string()).optional(),
  name: z.string().optional(),
  owner: z.string().optional(),
  public: z.boolean().optional(),
})

export type PinsBoard = z.infer<typeof boardSchema>
