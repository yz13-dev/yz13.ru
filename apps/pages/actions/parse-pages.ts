import { PageConfig } from "@/types/page.type";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

export const parsePages = (): PageConfig[] => {
  const pagesPath = "/app/(pages)";
  const path = "./app/(pages)";

  const pages = readdirSync(path);

  let files: any[] = [];

  pages.forEach((page) => {
    try {
      const pageConfigPath = join(path, page, "page.config.json");
      const pageConfig = JSON.parse(readFileSync(pageConfigPath, "utf8"));
      files.push(pageConfig);
    } catch (e) {
      console.log("Error", e);
    }
  });

  return files;
};
