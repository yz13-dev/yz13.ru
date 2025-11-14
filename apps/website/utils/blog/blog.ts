import { allPosts, type Post } from "@/.content-collections/generated";
import { isDev } from "@/const/enviroment";

export type BlogPost = Post;

export function getBlogPosts() {
  if (isDev) return allPosts
  return allPosts.filter(post => post.published === true)
}

export function getBlogPost(id: string) {
  return getBlogPosts().find(post => post._meta.path === id)
}
