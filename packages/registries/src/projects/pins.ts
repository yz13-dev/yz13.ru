import { joinStack } from "../utils/join";
import type { Project } from "./types";



export const pins: Project = {
  id: "pins",
  name: "Пинс",
  type: "project",
  description: "Галерея для вдохновления на новые проекты",
  attachment: [
    "/projects/pins/screenshots/home.png",
  ],
  stack: joinStack(["nextjs", "tailwindcss", "shadcnui"]),
  logo: {
    theme: {
      light: "/projects/pins/logo/light.png",
      dark: "/projects/pins/logo/dark.png"
    }
  }
}
