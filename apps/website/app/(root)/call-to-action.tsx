"use client";
import { setMenuId, toggleMenu } from "@/components/dock/menus/menu.store";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import Link from "next/link";
import { useHotkeys } from "react-hotkeys-hook";
import { cn } from "yz13/cn";

type Props = {
  hideSearch?: boolean;
};
const CallToAction = ({ hideSearch = false }: Props) => {
  useHotkeys(
    "ctrl+k, command+k",
    () => {
      toggleMenu("quick-search", true);
    },
    {
      preventDefault: true,
    },
  );
  return (
    <>
      <div className="w-full">
        <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
          <div className="w-full h-full pattern-lines" />
          <div className="h-6 border-x" />
          <div className="w-full h-full pattern-lines" />
        </div>
      </div>
      <div className="w-full">
        <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
          <div className="w-full h-full pattern-lines" />
          <div className="h-fit border-x px-6 flex items-center flex-row">
            <Button
              variant="secondary"
              className={cn(
                "gap-2 rounded-l-full pr-2.5",
                hideSearch ? "rounded-full" : "rounded-r-none",
              )}
              asChild
            >
              <Link href="/contact-me">
                <ArrowLeftIcon size={16} />
                Связаться
              </Link>
            </Button>
            <Separator
              orientation="vertical"
              className={cn("h-9", hideSearch && "hidden")}
            />
            <Button
              variant="secondary"
              className={cn(
                "max-w-xs w-full justify-between *:text-sm pl-2.5 relative rounded-r-full rounded-l-none",
                hideSearch && "hidden",
              )}
              onClick={() => setMenuId("quick-search", true)}
            >
              <span>Быстрый поиск</span>
              <kbd>Ctrl+K</kbd>
            </Button>
          </div>
          <div className="w-full h-full pattern-lines" />
        </div>
      </div>
    </>
  );
};

export default CallToAction;
