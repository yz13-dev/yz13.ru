import { RssIcon, TagsIcon } from "lucide-react";
import { CatalogItem } from "./types";

export default [
  {
    id: "tags",
    name: "Тэги",
    icon: <TagsIcon />,
  },
  {
    id: "updates",
    name: "Обновления",
    icon: <RssIcon />,
  },
] as CatalogItem[];
