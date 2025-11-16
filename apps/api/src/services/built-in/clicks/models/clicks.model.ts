import z from "zod";





export const ClicksSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  domain: z.string().nullable(),
  path: z.string(),
  from: z.string().nullable(),
})

export const NewClicksSchema = ClicksSchema.omit({
  id: true,
  created_at: true,
})

export type Clicks = z.infer<typeof ClicksSchema>;
export type NewClicks = z.infer<typeof NewClicksSchema>;
