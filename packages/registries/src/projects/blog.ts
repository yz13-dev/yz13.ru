import { joinStack } from "../utils/join";
import type { Project } from "./types";



export const blog: Project = {
  id: "blog",
  date: "2025-10-01",
  name: "Блог",
  type: "project",
  description: "Простой блог <3",
  attachment: [],
  stack: joinStack(["nextdotjs", "tailwindcss", "shadcnui"]),
  logo: {
    theme: {
      light: "/projects/blog/logo/light.png",
      dark: "/projects/blog/logo/dark.png"
    }
  }
}
