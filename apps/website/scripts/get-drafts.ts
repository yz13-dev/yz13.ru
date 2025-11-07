import { draft } from "@/utils/blog/draft";
import { existsSync } from "fs";
import { mkdir, rm, writeFile } from "fs/promises";

const generateDraft = async (url: string, name: string) => {
  try {
    if (!name.includes(".md")) return;
    const post = await fetch(url);

    const text = await post.text();

    await mkdir("./drafts", { recursive: true });

    const file = `./drafts/${name}`;

    await writeFile(file, text);

    console.log(`✅ Post ${name} generated`);

  } catch (error) {
    console.error(error);
  }
}

const clearDir = async () => {
  const path = "./drafts";
  try {
    const isExist = existsSync(path)

    if (!isExist) return;

    await rm(path, { recursive: true, force: true });
  } catch (error) {
    console.error(error);
  }
}

const fetchDrafts = async () => {
  try {
    const response = await fetch(`http://localhost:3000/blog/v1/drafts?token=${process.env.API_TOKEN}`)
    const posts: any[] = await response.json();

    if (!posts.length) throw new Error("No posts found");

    const slugs = posts.map(post => post.name);

    const items = slugs.map(slug => ({
      url: draft(slug),
      name: slug
    }));

    await clearDir();

    for (const item of items) {
      await generateDraft(item.url, item.name);
    }

    console.log("✅ All posts generated");

  } catch (error) {
    console.error(error);
  }
}

fetchDrafts();
