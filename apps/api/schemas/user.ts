import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().optional(),
  email_confirmed_at: z.string().optional(),
  phone: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string().optional(),
  last_signin_at: z.string().optional(),
  role: z.string(),
  username: z.string(),
  avatar_url: z.string().nullable(),
  identities: z.array(z.any()),
  position: z.string().optional(),
})

export const userSchemaArray = z.array(userSchema);

export const userInsertSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  options: z.object({
    data: z.object({
      username: z.string().optional(),
      avatar_url: z.string().url().nullable().optional(),
      position: z.string().optional(),
      role: z.string().optional(),
    }).optional(),
  }).optional(),
})

export const userUpdateSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().min(6).optional(),
  data: z.object({
    username: z.string().optional(),
    avatar_url: z.string().url().nullable().optional(),
    position: z.string().optional(),
    role: z.string().optional(),
  }).optional(),
}).partial();


export type UserObject = z.infer<typeof userSchema>;
