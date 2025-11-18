import { joinStack } from "../utils/join";
import type { Project } from "./types";

export const reserviaPartner: Project = {
  id: "reservia-partner",
  date: "2025-11-01",
  name: "Reservia/Partner",
  type: "work",
  description: "Управление реферальной программой для заведений",
  stack: joinStack(["reactrouter", "tailwindcss", "shadcnui"]),
  contentId: "reservia-partner",
  attachments: [
    "/works/reservia/partner/dashboard.png",
    "/works/reservia/partner/refs.png",
    "/works/reservia/partner/new-map.png",
  ],
  logo: {
    theme: {
      light: "/works/reservia/logo/light.png",
      dark: "/works/reservia/logo/dark.png",
    },
  },
};
