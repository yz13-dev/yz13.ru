import { joinStack } from "../utils/join";
import { reserviaAdmin } from "./reservia-admin";
import { reserviaClient } from "./reservia-client";
import { reserviaPartner } from "./reservia-partner";
import type { Project } from "./types";

export const reservia: Project = {
  id: "reservia",
  date: "2025-11-01",
  name: "Reservia",
  type: "work",
  description:
    "Приложение для администрации и резервирования столов в заведениях",
  stack: joinStack(["nextdotjs", "reactrouter", "tailwindcss", "shadcnui"]),
  contentId: "reservia",
  logo: {
    theme: {
      light: "/works/reservia/logo/light.png",
      dark: "/works/reservia/logo/dark.png",
    },
  },
  subProjects: [reserviaClient, reserviaAdmin, reserviaPartner],
};
