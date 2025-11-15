import { joinStack } from "../utils/join";
import type { Project } from "./types";



export const yzlab: Project = {
  id: "yzlab",
  name: "yzlab",
  type: "project",
  description: "Галерея сайтов и og обложек",
  url: "https://yzlab.ru",
  attachment: [
    "/projects/yzlab/screenshots/main.png",
    "/projects/yzlab/screenshots/site.png",
    "/projects/yzlab/screenshots/og.png",
  ],
  stack: joinStack(["nextdotjs", "tailwindcss", "shadcnui"]),
  logo: {
    theme: {
      light: "/projects/yzlab/logo/light.png",
      dark: "/projects/yzlab/logo/dark.png"
    }
  }
}
