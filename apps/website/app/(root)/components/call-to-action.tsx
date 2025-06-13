"use client";
import { getCallToAction } from "@/actions/call-to-action";
import { toggleMenu } from "@/components/dock/menus/menu.store";
import useTimeStore from "@/components/live/time.store";
import { cn } from "@yz13/ui/cn";
import { Button } from "@yz13/ui/components/button";
import { Skeleton } from "@yz13/ui/components/skeleton";
import { format } from "date-fns";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

type Props = {
  className?: string;
  hideSearch?: boolean;
  available?: boolean;
};

export const CallToActionSkeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="h-fit flex w-full justify-center items-center flex-row gap-2">
        <Skeleton className="rounded-full h-12 w-56" />
        <Skeleton className="rounded-full h-12 w-32" />
      </div>
    </div>
  );
};

const CallToAction = ({
  className = "",
  hideSearch = false,
  available = false
}: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("Подождите...");
  const [href, setHref] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(!available);
  const uuid = "4fd162a9-6da5-48cf-8f51-dc1c453ce1e4"
  const time = useTimeStore(state => state.time);
  const date = format(time, "yyyy-MM-dd");
  const CALL_TO_ACTION_LINK =
    `https://calendar.yz13.ru/booking/${uuid}?continue=https://yz13.ru&date=${date}`;
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
  const defaultLabel = "Запланировать видеозвонок"
  return (
    <>
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
              {defaultLabel}
            </Link>
          </Button>
        )
        :
        (
          <Button variant="default" className={cn("gap-2 ")} disabled={!available}>
            <ArrowLeftIcon size={16} />
            {defaultLabel}
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
    </>
  );
};

export default CallToAction;
