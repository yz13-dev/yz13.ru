// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
var posts = defineCollection({
  name: "posts",
  directory: "posts",
  include: "**/*.md",
  schema: z.object({
    pinned: z.boolean().optional(),
    title: z.string(),
    summary: z.string(),
    categories: z.array(z.string()),
    date: z.string(),
    authors: z.array(z.string())
  })
});
var drafts = defineCollection({
  name: "drafts",
  directory: "drafts",
  include: "**/*.md",
  schema: z.object({
    pinned: z.boolean().optional(),
    title: z.string(),
    summary: z.string(),
    categories: z.array(z.string()),
    date: z.string(),
    authors: z.array(z.string())
  })
});
var content_collections_default = defineConfig({
  collections: [posts, drafts]
});
export {
  content_collections_default as default
};
