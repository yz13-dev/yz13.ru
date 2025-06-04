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
  available?: boolean;
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

const CallToAction = ({ hideSearch = false, available = false }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("Подождите...");
  const [href, setHref] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(!available);
  const uuid = "4fd162a9-6da5-48cf-8f51-dc1c453ce1e4"
  const CALL_TO_ACTION_LINK =
    `https://calendar.yz13.ru/booking/${uuid}?continue=https://yz13.ru`;
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
        if (typeof action.disabled === "boolean") setDisabled(action.disabled);
        if (typeof action.visible === "boolean") setVisible(action.visible);
      }
    });
  }, []);
  return (
    <div className="h-fit flex w-fit items-center flex-row gap-2">
      {available ?
        (
          <Button
            variant="default"
            className={cn("gap-2")}
            disabled={!available}
            asChild
          >
            <Link href={CALL_TO_ACTION_LINK}>
              <ArrowLeftIcon size={16} />
              Связаться
            </Link>
          </Button>
        )
        :
        (
          <Button variant="default" className={cn("gap-2 ")} disabled={!available}>
            <ArrowLeftIcon size={16} />
            Связаться
          </Button>
        )}
      {!visible ? null : href ? (
        <Button
          disabled={disabled}
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
          disabled={disabled}
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
  );
};

export default CallToAction;
