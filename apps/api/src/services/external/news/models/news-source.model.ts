import z from "zod";



export const newsSourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  rss: z.string().nullable(),
  country_code: z.string(),
  last_checked_at: z.string().nullable(),
})


export type NewsSource = z.infer<typeof newsSourceSchema>
export type NewsSourceArray = z.infer<typeof newsSourceSchema>[]
