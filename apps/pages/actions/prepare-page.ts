"use server";
import { PageConfig } from "@/types/page.type";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import puppeteer from "puppeteer";
import { parsePage, writePageConfig } from "./parse-pages";
import { args } from "./puppeteer";

const URL = "http://localhost:3001";

const size = { width: 1600, height: 1200 };

const makeScreenshot = async (id: string, theme: "dark" | "light") => {
  try {
    const dir = `./public/pages/${id}`;
    const path = `./public/pages/${id}/${id}-${theme}.png`;
    const imagePath = `/pages/${id}/${id}-${theme}.png`;

    const hasDirToWrite = existsSync(dir);

    if (!hasDirToWrite) mkdirSync(dir, { recursive: true });

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", ...args],
    });

    const page = await browser.newPage();

    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: theme },
    ]);

    await page.setViewport(size);

    await page.goto(`${URL}/${id}`);

    await page.waitForNetworkIdle({
      idleTime: 1000,
    });

    const imgData = await page.screenshot({
      fullPage: false,
      type: "png",
    });

    writeFileSync(path, imgData);

    await browser.close();

    return imagePath;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const makePageThumbnail = async (id: string) => {
  const config = parsePage(id);
  if (config) {
    const lightThumbnail = await makeScreenshot(id, "light");
    const darkThumbnail = await makeScreenshot(id, "dark");

    console.log(lightThumbnail, darkThumbnail);

    if (!lightThumbnail || !darkThumbnail) return null;

    const newConfig: PageConfig = {
      ...config,
      thumbnail: {
        light: lightThumbnail,
        dark: darkThumbnail,
      },
    };

    return writePageConfig(id, newConfig);
  } else return null;
};
