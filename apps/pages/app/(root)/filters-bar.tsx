"use client";

import { ChevronDownIcon, HeartIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "yz13/cn";

type Filter = {
  value: string;
  label: string;
  icon?: ReactNode;
};

type FiltersBarProps = {
  className?: string;
  value?: string;
  defaultValue?: string;
  filters?: Filter[];
};

const KEY = "sort";

const FiltersBar = ({
  className = "",
  value,
  defaultValue,
  filters = [],
}: FiltersBarProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleValueChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(KEY, value);
    router.replace(`?${newSearchParams.toString()}`);
  };
  return (
    <nav className={cn("flex flex-row gap-2 px-2 py-1.5", className)}>
      <Button variant="outline" size="icon" disabled>
        <HeartIcon size={16} />
      </Button>
      <Separator orientation="vertical" className="h-9" />
      <div className="flex items-center gap-2 w-full">
        {filters.map((filter) => {
          const isSelected =
            filter.value === value || filter.value === defaultValue;
          return (
            <Button
              variant={isSelected ? "secondary" : "ghost"}
              onClick={() => handleValueChange(filter.value)}
              className="gap-2 [&>svg]:size-4"
            >
              {filter.icon}
              {filter.label}
            </Button>
          );
        })}
      </div>
      {/* <Separator orientation="vertical" className="h-9" /> */}
      {false && (
        <Button variant="outline" size="icon">
          <ChevronDownIcon size={16} />
        </Button>
      )}
    </nav>
  );
};

export default FiltersBar;
