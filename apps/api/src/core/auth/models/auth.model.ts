import { z } from "zod";

// Схемы для запросов аутентификации
export const loginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
});

export const registerRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  username: z.string().min(3)
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
