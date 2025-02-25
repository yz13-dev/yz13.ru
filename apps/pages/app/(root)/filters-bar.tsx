"use client";

import { HeartIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "yz13/cn";

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
  return (
    <nav className={cn("flex flex-row gap-2 px-6 py-3", className)}>
      <Button variant="outline" size="icon" disabled>
        <HeartIcon size={16} />
      </Button>
      <Separator orientation="vertical" className="h-9" />
      <Button
        variant={type === "all" || !type ? "default" : "ghost"}
        onClick={() => handleTypeChange("all")}
      >
        Все
      </Button>
      <Button
        variant={type === "page" ? "default" : "ghost"}
        onClick={() => handleTypeChange("page")}
      >
        Страницы
      </Button>
      <Button
        variant={type === "component" ? "default" : "ghost"}
        onClick={() => handleTypeChange("component")}
      >
        Компоненты
      </Button>
    </nav>
  );
};

export default FiltersBar;
