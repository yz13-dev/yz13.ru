import { joinStack } from "../utils/join";
import type { Project } from "./types";



export const yzlab: Project = {
  id: "yzlab",
  name: "yzlab",
  description: "Галерея сайтов и og обложек",
  url: "https://yzlab.ru",
  attachment: [
    "/projects/yzlab/screenshots/main.png",
    "/projects/yzlab/screenshots/site.png",
    "/projects/yzlab/screenshots/og.png",
  ],
  stack: joinStack(["nextjs", "tailwindcss", "shadcnui"])
}
