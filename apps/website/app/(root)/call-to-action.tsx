"use client";
import { getCallToAction } from "@/actions/call-to-action";
import { toggleMenu } from "@/components/dock/menus/menu.store";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { cn } from "yz13/cn";

type Props = {
  hideSearch?: boolean;
  busy?: boolean;
};
const CallToAction = ({ hideSearch = false, busy = false }: Props) => {
  const [label, setLabel] = useState<string>("Подождите...");
  const [href, setHref] = useState<string | null>(null);
  useHotkeys(
    "ctrl+k, command+k",
    () => {
      toggleMenu("quick-search", true);
    },
    {
      preventDefault: true,
    },
  );
  useEffect(() => {
    getCallToAction().then((action) => {
      if (action) {
        setLabel(action.label);
        if (action.href) setHref(action.href);
      }
    });
  }, []);
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
          <div className="w-full px-6 border-x">
            <div className="h-fit flex w-fit items-center flex-row">
              {busy ? (
                <Button
                  variant="secondary"
                  className={cn(
                    "gap-2 rounded-l-full pr-2.5",
                    hideSearch ? "rounded-full" : "rounded-r-none",
                  )}
                  disabled={busy}
                >
                  <ArrowLeftIcon size={16} />
                  Связаться
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className={cn(
                    "gap-2 rounded-l-full pr-2.5",
                    hideSearch ? "rounded-full" : "rounded-r-none",
                  )}
                  disabled={busy}
                  asChild
                >
                  <Link href="/contact-me">
                    <ArrowLeftIcon size={16} />
                    Связаться
                  </Link>
                </Button>
              )}
              <Separator
                orientation="vertical"
                className={cn("h-9", hideSearch && "hidden")}
              />
              {href ? (
                <Button
                  variant="secondary"
                  className={cn(
                    "max-w-xs w-full justify-center *:text-sm pl-2.5 relative rounded-r-full rounded-l-none",
                    hideSearch && "hidden",
                  )}
                  asChild
                >
                  <Link href={href}>
                    <span>{label}</span>
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className={cn(
                    "max-w-xs w-full justify-center *:text-sm pl-2.5 relative rounded-r-full rounded-l-none",
                    hideSearch && "hidden",
                  )}
                >
                  <span>{label}</span>
                </Button>
              )}
            </div>
          </div>
          <div className="w-full h-full pattern-lines" />
        </div>
      </div>
    </>
  );
};

export default CallToAction;
