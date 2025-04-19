"use client";
import { getCallToAction } from "@/actions/call-to-action";
import { toggleMenu } from "@/components/dock/menus/menu.store";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { cn } from "yz13/cn";

type Props = {
  hideSearch?: boolean;
  busy?: boolean;
};

export const CallToActionSkeleton = () => {
  return (
    <div className="w-full">
      <div className="h-fit flex w-fit items-center flex-row gap-2">
        <Skeleton className="rounded-full h-9 w-32" />
        <Skeleton className="rounded-full h-9 w-56" />
      </div>
    </div>
  );
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
        <div className="h-fit flex w-fit items-center flex-row gap-2">
          {busy ? (
            <Button variant="default" className={cn("gap-2 ")} disabled={busy}>
              <ArrowLeftIcon size={16} />
              Связаться
            </Button>
          ) : (
            <Button
              variant="default"
              className={cn("gap-2")}
              disabled={busy}
              asChild
            >
              <Link href="/contact-me">
                <ArrowLeftIcon size={16} />
                Связаться
              </Link>
            </Button>
          )}
          {href ? (
            <Button
              variant="secondary"
              className={cn(
                "max-w-xs w-fit justify-center *:text-sm relative",
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
                "max-w-xs w-fit justify-center *:text-sm relative",
                hideSearch && "hidden",
              )}
            >
              <span>{label}</span>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default CallToAction;
