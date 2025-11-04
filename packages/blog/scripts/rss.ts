import { rssPlugin } from "vite-plugin-rss";
import { allPosts } from "../.content-collections/generated";

const posts = allPosts;

export default function () {
  return rssPlugin({
    mode: "define",
    channel: {
      title: "YZ13 Блог",
      link: "https://blog.yz13.ru",
    },
    items: posts
      .map(post => {
        const title = post.title;
        const path = post._meta.path;
        const prefix = "";
        const url = `https://blog.yz13.ru/${prefix}/${path}`;
        const description = post.summary;
        const date = new Date(post.date);
        const authors = post.authors.join(", ");
        const categories = post.categories.join(", ");
        return {
          title,
          link: url,
          pubDate: date,
          description,
          guid: url,
          author: authors,
          category: categories,
        }
      })
  })
}
