import { getBlogV1Posts } from "@yz13/api";
import { existsSync } from "fs";
import { mkdir, rm, writeFile } from "fs/promises";
import { blog } from "../src/utils/blog";

const generatePost = async (url: string, name: string) => {
  try {
    if (!name.includes(".md")) return;

    const post = await fetch(url);

    const text = await post.text();

    await mkdir("./posts", { recursive: true });

    const file = `./posts/${name}`;

    await writeFile(file, text);

    console.log(`✅ Post ${name} generated`);

  } catch (error) {
    console.error(error);
  }
}

const clearDir = async () => {
  const path = "./posts";
  try {
    const isExist = existsSync(path)

    if (!isExist) return;

    await rm(path, { recursive: true, force: true });
  } catch (error) {
    console.error(error);
  }
}

const fetchPosts = async () => {
  try {
    const posts = await getBlogV1Posts();

    if (!posts.length) throw new Error("No posts found");

    console.log(posts);

    const slugs = posts.map(post => post.name);

    const items = slugs.map(slug => ({
      url: blog(slug),
      name: slug
    }));

    await clearDir();

    for (const item of items) {
      await generatePost(item.url, item.name);
    }

    console.log("✅ All posts generated");

  } catch (error) {
    console.error(error);
  }
}

fetchPosts();
