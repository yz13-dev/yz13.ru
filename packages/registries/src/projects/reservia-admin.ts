import { joinStack } from "../utils/join";
import type { Project } from "./types";

export const reserviaAdmin: Project = {
  id: "reservia-admin",
  date: "2025-11-01",
  name: "Reservia/Admin",
  type: "work",
  description: "Администрирование заведений, управление и отслеживание броней.",
  stack: joinStack(["reactrouter", "tailwindcss", "shadcnui"]),
  contentId: "reservia-admin",
  attachments: [
    "/works/reservia/admin/home.png",
    "/works/reservia/admin/map-creating.png",
    "/works/reservia/admin/timeline.png",
  ],
  logo: {
    theme: {
      light: "/works/reservia/logo/light.png",
      dark: "/works/reservia/logo/dark.png",
    },
  },
};
