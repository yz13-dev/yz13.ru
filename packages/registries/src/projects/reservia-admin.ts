import { joinStack } from "../utils/join";
import type { Project } from "./types";

export const reserviaAdmin: Project = {
  id: "reservia-admin",
  date: "2025-11-01",
  name: "Reservia/Admin",
  type: "work",
  description:
    "Приложение для администрации и резервирования столов в заведениях",
  contentId: "reservia",
  stack: joinStack(["nextdotjs", "reactrouter", "tailwindcss", "shadcnui"]),
  logo: {
    theme: {
      light: "/works/reservia/logo/light.png",
      dark: "/works/reservia/logo/dark.png",
    },
  },
};
