import { getCategory } from "@/const/blog/categories";
import type { Post } from "content-collections";

type Category = {
  label: string
  id: string
}

export const getCategories = (posts: Post[]): Category[] => {
  const categories = posts.flatMap(post => post.categories);

  const onlyUnique = [...new Set(categories)]
  return onlyUnique.map(category => ({
    id: category,
    label: getCategory(category)
  }));
}
