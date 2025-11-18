import { joinStack } from "../utils/join";
import type { Project } from "./types";

export const reserviaClient: Project = {
  id: "reservia-client",
  date: "2025-11-01",
  name: "Reservia/Client",
  type: "work",
  description:
    "Бронирование столов в заведениях, управление и отслеживание броней.",
  stack: joinStack(["reactrouter", "tailwindcss", "shadcnui"]),
  contentId: "reservia-client",
  attachments: [
    "/works/reservia/client/client-step-1.png",
    "/works/reservia/client/client-step-2.png",
    "/works/reservia/client/client-step-4.png",
  ],
  logo: {
    theme: {
      light: "/works/reservia/logo/light.png",
      dark: "/works/reservia/logo/dark.png",
    },
  },
};
