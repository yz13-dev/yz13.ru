import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const posts = defineCollection({
  name: "posts",
  directory: "posts",
  include: "**/*.mdx",
  schema: z.object({
    pinned: z.boolean().optional(),
    title: z.string(),
    summary: z.string(),
    categories: z.array(z.string()),
    date: z.string(),
    authors: z.array(z.string()),
  }),
  transform: async (data, context) => {
    const body = await compileMDX(context, data);
    return {
      ...data,
      body,
    };
  },
});


export default defineConfig({
  collections: [posts],
});
