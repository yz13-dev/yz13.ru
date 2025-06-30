import { z } from "zod";

export const newsSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  url: z.string().url(),
  author: z.string().nullable(),
  published_at: z.string().datetime({ offset: true }),
  source: z.string().nullable(),
  source_id: z.string().nullable(),
  method: z.string(),
  tags: z.array(z.string()).nullable(),
  img: z.any().nullable(), // Json type
});

export const newsInsertSchema = newsSchema.omit({
  id: true,
}).partial({
  description: true,
  author: true,
  source: true,
  source_id: true,
  tags: true,
  img: true,
});

export const newsUpdateSchema = newsSchema.partial().omit({
  id: true,
});

export const newsArraySchema = z.array(newsSchema);

export type News = z.infer<typeof newsSchema>;
export type NewsInsert = z.infer<typeof newsInsertSchema>;
export type NewsUpdate = z.infer<typeof newsUpdateSchema>;
