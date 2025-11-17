import { joinStack } from "../utils/join";
import type { Project } from "./types";



export const pins: Project = {
  id: "pins",
  date: "2025-10-01",
  name: "Пинс",
  type: "project",
  description: "Галерея для вдохновления на новые проекты",
  attachments: [
    "/projects/pins/screenshots/home.png",
  ],
  stack: joinStack(["nextdotjs", "tailwindcss", "shadcnui"]),
  logo: {
    theme: {
      light: "/projects/pins/logo/light.png",
      dark: "/projects/pins/logo/dark.png"
    }
  }
}
