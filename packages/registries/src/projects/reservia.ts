import { joinStack } from "../utils/join";
import type { Project } from "./types";



export const reservia: Project = {
  id: "reservia",
  name: "Reservia",
  description: "Приложение для администрации и резервирования столов в заведениях",
  contentId: "reservia",
  attachment: [
    "/works/reservia/home.png",
    "/works/reservia/map-creating.png",
    "/works/reservia/timeline.png",
  ],
  stack: joinStack(["nextjs", "reactrouter", "tailwindcss", "shadcnui"])
}
