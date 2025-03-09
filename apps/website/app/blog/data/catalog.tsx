import { NewspaperIcon, UserIcon } from "lucide-react";
import { CatalogItem } from "./types";

export default [
  {
    id: "news",
    name: "Новости",
    icon: <NewspaperIcon />,
  },
  {
    id: "yz13",
    name: "YZ13",
    icon: <UserIcon />,
  },
] as CatalogItem[];
