"use client";

import {
  AppWindowMacIcon,
  ChevronDownIcon,
  FolderIcon,
  HeartIcon,
  PackageIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "yz13/cn";
import { setExpanded, useRootStore } from "./root-store";

type FiltersBarProps = {
  className?: string;
  type?: string;
};
const FiltersBar = ({ className = "", type = "all" }: FiltersBarProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleTypeChange = (type: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("type", type);
    router.replace(`?${newSearchParams.toString()}`);
  };
  const expanded = useRootStore((state) => state.expanded);
  return (
    <nav
      className={cn(
        "flex flex-row gap-2 px-6 py-1.5",
        expanded ? "!mt-0" : "",
        className,
      )}
    >
      <Button variant="outline" size="icon" disabled>
        <HeartIcon size={16} />
      </Button>
      <Separator orientation="vertical" className="h-9" />
      <div className="flex items-center gap-2 w-full">
        <Button
          variant={type === "all" || !type ? "secondary" : "ghost"}
          onClick={() => handleTypeChange("all")}
          className="gap-2"
        >
          <FolderIcon size={16} />
          Все
        </Button>
        <Button
          variant={type === "page" ? "secondary" : "ghost"}
          onClick={() => handleTypeChange("page")}
          className="gap-2"
        >
          <AppWindowMacIcon size={16} />
          Страницы
        </Button>
        <Button
          variant={type === "component" ? "secondary" : "ghost"}
          onClick={() => handleTypeChange("component")}
          className="gap-2"
        >
          <PackageIcon size={16} />
          Компоненты
        </Button>
      </div>
      <Separator orientation="vertical" className="h-9" />
      <Button
        variant="outline"
        size="icon"
        onClick={() => setExpanded(!expanded)}
      >
        <ChevronDownIcon
          size={16}
          className={cn(
            expanded ? "rotate-180" : "rotate-0",
            "transition-transform",
          )}
        />
      </Button>
    </nav>
  );
};

export default FiltersBar;
