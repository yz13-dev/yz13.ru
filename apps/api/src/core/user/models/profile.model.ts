import z from "zod";



export const profileSchema = z.object({
  avatar_url: z.string().nullable(),
  created_at: z.string(),
  full_name: z.string().nullable(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
  username: z.string().nullable(),
})

export const profileArraySchema = z.array(profileSchema);

export type UserProfile = z.infer<typeof profileSchema>;
