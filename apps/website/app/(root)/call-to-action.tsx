"use client";
import { setMenuId, toggleMenu } from "@/components/dock/menus/menu.store";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { useHotkeys } from "react-hotkeys-hook";

const CallToAction = () => {
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
              className="gap-2 rounded-l-full rounded-r-none pr-2.5"
            >
              <ArrowLeftIcon size={16} />
              Связаться
            </Button>
            <Separator orientation="vertical" className="h-9" />
            <Button
              variant="secondary"
              className="max-w-xs w-full justify-between *:text-sm pl-2.5 relative rounded-r-full rounded-l-none"
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
