"use client";

import {
  BriefcaseBusinessIcon,
  ChevronDownIcon,
  FolderIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "mono/components/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "mono/components/tooltip";
import Link from "next/link";
import { useState } from "react";
import { cn } from "yz13/cn";

export default function ItemsGroup({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "size-12 gap-2 px-2 rounded-xl border flex relative items-center justify-center",
            className,
          )}
        >
          <ChevronDownIcon
            size={18}
            className={cn(
              "text-foreground transition-transform",
              open ? "rotate-180" : "rotate-0",
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        sideOffset={12}
        className="rounded-xl w-fit flex flex-col items-center gap-2 p-0 bg-transparent border-none"
      >
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button className="size-12 rounded-xl border gap-2 bg-background flex relative items-center justify-center">
              <Link
                href="/projects"
                className="absolute left-0 top-0 w-full h-full"
              />
              <FolderIcon size={18} className="text-foreground" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" align="center" className="border">
            Проекты
          </TooltipContent>
        </Tooltip>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button className="size-12 rounded-xl border gap-2 bg-background flex relative items-center justify-center">
              <Link
                href="/services"
                className="absolute left-0 top-0 w-full h-full"
              />
              <BriefcaseBusinessIcon size={18} className="text-foreground" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" align="center" className="border">
            Услуги
          </TooltipContent>
        </Tooltip>
      </PopoverContent>
    </Popover>
  );
}
