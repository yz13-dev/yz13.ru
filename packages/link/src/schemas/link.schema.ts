import z from "zod";
import { socials, socials_icons } from "../const/socials";


export const userSchema = z.object({
  fullname: z.string().nullish(),
  username: z.string(),
  avatar_url: z.string().nullable().refine((avatar) => avatar ? avatar.startsWith("/avatar") : true),
  description: z.string().nullish(),
})

export const linkSchema = z.object({
  url: z.url(),
  label: z.string(),
  icon: z.string().nullish(),
  description: z.string().nullish(),
})

const socialsEnum = z.enum(socials);
const socialsRecord = z.record(socialsEnum, z.object({
  url: z.url()
}).optional());


export const socialSchema = z.object({
  id: socialsEnum,
  url: z.url()
})

const singleActionSchema = z.object({
  label: z.string(),
  icon: z.string().nullish(),
  type: z.enum(["link", "copy", "custom"]).default("link"),
  value: z.string(),
  disabled: z.boolean().optional(),
});

export const actionSchema = z.object({
  primary: singleActionSchema.optional(),
  secondary: singleActionSchema.optional(),
});

export const jsonSchema = z.object({
  profession: z.string().nullish(),
  user: userSchema,
  items: z.array(linkSchema),
  socials: socialsRecord.optional(),
  actions: actionSchema.optional(),
})

export type Socials = {
  [key in keyof typeof socials_icons]: {
    url: string
  } | undefined
}
export type Actions = z.infer<typeof actionSchema>
export type Link = z.infer<typeof linkSchema>
export type Json = z.infer<typeof jsonSchema>
export type User = z.infer<typeof userSchema>
