"use client";
import {
  ChevronDownIcon,
  LayoutGridIcon,
  MenuIcon,
  SearchIcon,
  SettingsIcon,
  StickerIcon,
  TerminalSquareIcon,
  WifiIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "yz13/cn";

const Items = ({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (state: boolean) => void;
}) => {
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
        disabled
        asChild
      >
        <Link href="/search">
          <SearchIcon size={18} />
        </Link>
      </Button>
      <Button
        disabled={!onOpenChange}
        onClick={() => onOpenChange && onOpenChange(!open)}
        variant="ghost"
        size="lg"
        className="w-fit !rounded-l-none rounded-r-xl gap-2"
      >
        <MenuIcon size={18} />
      </Button>
    </div>
  );
};

const Menu = ({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (state: boolean) => void;
}) => {
  return (
    <div className="w-full h-full flex py-4 px-6 flex-col justify-between gap-2">
      <Input
        placeholder="Search for ..."
        className="max-w-md rounded-full mx-auto"
      />

      <div className="w-full h-24 grid grid-cols-6 gap-2">
        <div className="w-full aspect-square rounded-xl bg-yz-neutral-200" />
        <div className="w-full aspect-square rounded-xl bg-yz-neutral-200" />
        <div className="w-full aspect-square rounded-xl bg-yz-neutral-200" />
        <div className="w-full aspect-square rounded-xl bg-yz-neutral-200" />
        <div className="w-full aspect-square rounded-xl bg-yz-neutral-200" />
        <div className="w-full aspect-square rounded-xl bg-yz-neutral-200" />
      </div>

      <div className="w-full h-fit grid grid-cols-2 gap-2">
        <div className="w-full aspect-video rounded-xl bg-yz-neutral-200" />
        <div className="w-full aspect-video rounded-xl bg-yz-neutral-200" />
      </div>

      <div className="w-full h-fit grid grid-cols-4 gap-2">
        <div className="w-full aspect-[4/3] rounded-xl bg-yz-neutral-200" />
        <div className="w-full aspect-[4/3] rounded-xl bg-yz-neutral-200" />
        <div className="w-full aspect-[4/3] rounded-xl bg-yz-neutral-200" />
        <div className="w-full aspect-[4/3] rounded-xl bg-yz-neutral-200" />
      </div>

      <div className="flex flex-row gap-2 w-full justify-between">
        <div className="flex flex-row gap-2 w-fit items-center">
          <div className="size-8 rounded-full bg-yz-neutral-100" />
          <span className="text-sm text-foreground">YZ13</span>
        </div>
        <div className="flex flex-row gap-2 w-fit items-center">
          <Button
            size="icon"
            variant="ghost"
            className="p-1 size-7"
            onClick={() => onOpenChange && onOpenChange(false)}
          >
            <ChevronDownIcon size={18} />
          </Button>
          <Button size="icon" variant="ghost" className="p-1 size-7">
            <WifiIcon size={18} />
          </Button>
          <Button size="icon" variant="ghost" className="p-1 size-7">
            <SettingsIcon size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Dock = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      animate={{
        width: isOpen ? "700px" : "410px",
        height: isOpen ? "600px" : "40px",
      }}
      transition={{
        duration: 0.1,
        ease: "easeInOut",
        type: "spring",
        stiffness: 35,
      }}
      className={cn(
        "h-fit w-fit flex flex-row fixed left-0 right-0 mx-auto bottom-3 items-center justify-center",
        "bg-background border rounded-xl",
      )}
    >
      {!isOpen ? (
        <Items onOpenChange={setIsOpen} />
      ) : (
        <Menu onOpenChange={setIsOpen} />
      )}
    </motion.div>
  );
};

export default Dock;
