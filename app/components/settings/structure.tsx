import { KeySquareIcon, type LucideIcon, SettingsIcon, UserCircleIcon } from "lucide-react";
import type { ReactElement } from "react";
import Profile from "./sections/profile";
import Security from "./sections/security";
import Theme from "./sections/theme";


type StructureItem = {
  name: string;
  id: string;
  icon: LucideIcon;
  content: ReactElement;
  required?: {
    user?: boolean;
  };
}

const structure: StructureItem[] = [
  {
    name: "Общие",
    id: "general",
    icon: SettingsIcon,
    content: <Theme />
  },
  {
    name: "Безопасность",
    id: "security",
    icon: KeySquareIcon,
    content: <Security />
  },
  {
    name: "Профиль",
    id: "profile",
    icon: UserCircleIcon,
    content: <Profile />,
  },
] as const;

export const defaultSection = "general" as const;

export const getTabs = () => structure.map(item => ({
  id: item.id,
  name: item.name,
  icon: item.icon,
  required: item.required
}));
export const getName = (id: string) => structure.find(item => item.id === id)?.name;
export const getContent = (id: string) => structure.find(item => item.id === id)?.content;

export default structure;
