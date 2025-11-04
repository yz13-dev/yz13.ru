import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const posts = defineCollection({
  name: "posts",
  directory: "posts",
  include: "**/*.md",
  schema: z.object({
    pinned: z.boolean().optional(),
    title: z.string(),
    summary: z.string(),
    categories: z.array(z.string()),
    date: z.string(),
    authors: z.array(z.string()),
  }),
});

const drafts = defineCollection({
  name: "drafts",
  directory: "drafts",
  include: "**/*.md",
  schema: z.object({
    pinned: z.boolean().optional(),
    title: z.string(),
    summary: z.string(),
    categories: z.array(z.string()),
    date: z.string(),
    authors: z.array(z.string()),
  }),
});

export default defineConfig({
  collections: [posts, drafts],
});
