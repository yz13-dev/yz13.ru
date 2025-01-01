"use client";
import {
  LayoutGridIcon,
  MenuIcon,
  SearchIcon,
  StickerIcon,
  TerminalSquareIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";
import { cn } from "yz13/cn";

const Items = () => {
  return (
    <div className="flex flex-row items-center *:!px-3">
      <Button
        variant="ghost"
        size="lg"
        className="w-fit !rounded-r-none rounded-l-xl gap-2"
        asChild
      >
        <Link href="/discover">
          <LayoutGridIcon size={18} />
          Discover
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="lg"
        className="w-fit !rounded-none gap-2"
        asChild
      >
        <Link href="/terminal">
          <TerminalSquareIcon size={18} />
          Terminal
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="lg"
        className="w-fit !rounded-none gap-2"
        asChild
      >
        <Link href="/releases">
          <StickerIcon size={18} />
          Releases
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="lg"
        className="w-fit !rounded-none gap-2"
        asChild
      >
        <Link href="/search">
          <SearchIcon size={18} />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="lg"
        className="w-fit !rounded-l-none rounded-r-xl gap-2"
      >
        <MenuIcon size={18} />
      </Button>
    </div>
  );
};

const Dock = () => {
  return (
    <div
      className={cn(
        "h-fit w-fit flex flex-row fixed left-0 right-0 mx-auto bottom-3 items-center justify-center",
        "bg-background border rounded-xl",
      )}
    >
      <Items />
    </div>
  );
};

export default Dock;
