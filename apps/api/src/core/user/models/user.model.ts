import z from "zod";

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
});

// Схема для массива пользователей
export const usersArraySchema = z.array(userSchema);

export type UserObject = z.infer<typeof userSchema>;
export type UsersArray = z.infer<typeof usersArraySchema>;
