import { joinStack } from "../utils/join";
import type { Project } from "./types";



export const reservia: Project = {
  id: "reservia",
  name: "Reservia",
  type: "work",
  description: "Приложение для администрации и резервирования столов в заведениях",
  contentId: "reservia",
  attachment: [
    "/works/reservia/home.png",
    "/works/reservia/map-creating.png",
    "/works/reservia/timeline.png",
  ],
  stack: joinStack(["nextdotjs", "reactrouter", "tailwindcss", "shadcnui"]),
  logo: {
    theme: {
      light: "/works/reservia/logo/light.png",
      dark: "/works/reservia/logo/dark.png"
    }
  }
}
