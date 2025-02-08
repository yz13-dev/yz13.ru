import { ReleaseType } from "@/const/releases";
import { AppWindowMacIcon, LayoutGridIcon, LucideIcon } from "lucide-react";

const ProjectTypeIcons: Record<ReleaseType, LucideIcon> = {
  app: AppWindowMacIcon,
  widget: LayoutGridIcon,
};

export default ProjectTypeIcons;
