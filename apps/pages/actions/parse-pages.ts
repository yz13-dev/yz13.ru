import { PageConfig } from "@/types/page.type";
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const pagesPath =
  process.env.NODE_ENV === "development" ? "./app/(pages)" : "./pages";

export const parsePages = (): PageConfig[] => {
  try {
    const path = pagesPath;

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

    if (process.env.NODE_ENV === "development") return files;
    else return files.filter((file) => file.public === true);
  } catch (e) {
    console.log("Error", e);
    return [];
  }
};

export const parsePage = (id: string): PageConfig | null => {
  try {
    const path = `${pagesPath}/${id}`;
    const pageConfigPath = join(path, "page.config.json");
    const pageConfig = JSON.parse(readFileSync(pageConfigPath, "utf8"));
    return pageConfig;
  } catch (e) {
    console.log("Error", e);
    return null;
  }
};

export const writePageConfig = (id: string, config: PageConfig) => {
  try {
    const path = `${pagesPath}/${id}/page.config.json`;
    const pageConfig = JSON.stringify(config, null, 2);
    writeFileSync(path, pageConfig);
    return config;
  } catch (e) {
    console.log("Error", e);
    return null;
  }
};
