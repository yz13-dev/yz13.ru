import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Post = GetTypeByName<typeof configuration, "posts">;
export declare const allPosts: Array<Post>;

export type Draft = GetTypeByName<typeof configuration, "drafts">;
export declare const allDrafts: Array<Draft>;

export {};
