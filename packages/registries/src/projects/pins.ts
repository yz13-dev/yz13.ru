import { joinStack } from "../utils/join";
import type { Project } from "./types";



export const pins: Project = {
  id: "pins",
  name: "Пинс",
  description: "Галерея для вдохновления на новые проекты",
  attachment: [
    "/projects/pins/screenshots/home.png",
  ],
  stack: joinStack(["nextjs", "tailwindcss", "shadcnui"])
}
