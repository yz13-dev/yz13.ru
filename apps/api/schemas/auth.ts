import { z } from "zod";

export const authSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authSignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(2),
});

export const authSignOutSchema = z.object({
  refresh_token: z.string(),
});

export const authRefreshSchema = z.object({
  refresh_token: z.string(),
});

export const authResetPasswordSchema = z.object({
  email: z.string().email(),
});

export const authUpdatePasswordSchema = z.object({
  password: z.string().min(6),
});

export type AuthSignIn = z.infer<typeof authSignInSchema>;
export type AuthSignUp = z.infer<typeof authSignUpSchema>;
export type AuthSignOut = z.infer<typeof authSignOutSchema>;
export type AuthRefresh = z.infer<typeof authRefreshSchema>;
export type AuthResetPassword = z.infer<typeof authResetPasswordSchema>;
export type AuthUpdatePassword = z.infer<typeof authUpdatePasswordSchema>; 