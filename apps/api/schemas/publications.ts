import { z } from "zod";

export const publicationsSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  icon: z.any(), // Json type
  publisher_id: z.string(),
  publisher_type: z.string(),
  type: z.string().nullable(),
  stage: z.string().nullable(),
  categories: z.array(z.string()).nullable(),
  tags: z.array(z.string()).nullable(),
  public_url: z.string().nullable(),
  published_version: z.string().nullable(),
  versions: z.array(z.any()).nullable(), // Json[] type
  is_archived: z.boolean().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const publicationsInsertSchema = publicationsSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
}).partial({
  description: true,
  type: true,
  stage: true,
  categories: true,
  tags: true,
  public_url: true,
  published_version: true,
  versions: true,
  is_archived: true,
});

export const publicationsUpdateSchema = publicationsSchema.partial().omit({
  id: true,
  created_at: true,
});

export const publicationsArraySchema = z.array(publicationsSchema);

export type Publication = z.infer<typeof publicationsSchema>;
export type PublicationInsert = z.infer<typeof publicationsInsertSchema>;
export type PublicationUpdate = z.infer<typeof publicationsUpdateSchema>; 