import { getBlogV1Drafts } from "@yz13/api";
import { existsSync } from "fs";
import { mkdir, rm, writeFile } from "fs/promises";
import { draft } from "../src/utils/draft";

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
    const posts = await getBlogV1Drafts({ params: { "token": import.meta.env.API_TOKEN } });

    if (!posts.length) throw new Error("No posts found");

    console.log(posts)

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
