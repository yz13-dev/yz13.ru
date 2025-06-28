import { z } from "zod";

export const newsSourcesSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  url: z.string().url(),
  country_code: z.string(),
  rss: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
});

export const newsSourcesInsertSchema = newsSourcesSchema.omit({
  id: true,
  created_at: true,
}).partial({
  rss: true,
});

export const newsSourcesUpdateSchema = newsSourcesSchema.partial().omit({
  id: true,
});

export const newsSourcesArraySchema = z.array(newsSourcesSchema);

export type NewsSource = z.infer<typeof newsSourcesSchema>;
export type NewsSourceInsert = z.infer<typeof newsSourcesInsertSchema>;
export type NewsSourceUpdate = z.infer<typeof newsSourcesUpdateSchema>; 