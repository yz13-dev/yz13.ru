import { blog } from "@/utils/blog/blog";
import { existsSync } from "fs";
import { mkdir, rm, writeFile } from "fs/promises";

const generatePost = async (url: string, name: string) => {
  try {

    const nameWithExtension = name.includes(".md") ? name : `${name}.md`;

    const post = await fetch(url);

    const text = await post.text();

    await mkdir("./posts", { recursive: true });

    const file = `./posts/${nameWithExtension}`;

    await writeFile(file, text);

    console.log(`✅ Post ${nameWithExtension} generated`);

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
    const response = await fetch(`http://localhost:3000/blog/v1/posts`)
    const posts = await response.json();

    if (!posts.length) throw new Error("No posts found");


    const slugs = posts.map(post => post.id);

    console.log("posts", posts, slugs);

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
