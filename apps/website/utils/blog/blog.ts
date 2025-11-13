import { allPosts, type Post } from "@/.content-collections/generated";
import { isDev } from "@/const/enviroment";

export type BlogPost = Post;

export function getBlogPosts() {
  if (isDev) return allPosts
  return allPosts.filter(post => post.published !== true)
}
