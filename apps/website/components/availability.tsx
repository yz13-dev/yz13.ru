import { Typewriter } from "@/components/text-writter";
import { availableForWork } from "@yz13/flags";
import { Skeleton } from "mono/components/skeleton";
import type { ReactNode } from "react";
import { cn } from "yz13/cn";

type AvailabilityProps = {
  label?: ReactNode;
  className?: string;
};

const availableTexts = [
  "Открыт для заказов",
  "Закажите какой-нибудь проект",
  "Готов к новым задачам",
  "Жду ваши идеи",
  "Свободен для сотрудничества",
  "Можно заказать проект",
  "Есть время на новые заказы"
];

const unavailableTexts = [
  "Работаю над заказами",
  "Есть пара заказов",
  "Делаю вид что работаю",
  "Занят выполнением проектов",
  "Нет свободного времени",
  "Временно перегружен",
  "Все силы уходят на текущие проекты",
  "В тисках дедлайнов",
  "Завален работой"
];

const Availability = async ({ label, className = "" }: AvailabilityProps) => {
  const available = await availableForWork();
  const status: "available" | "unavailable" = available
    ? "available"
    : "unavailable";

  const text = status === "available" ? availableTexts : unavailableTexts;
  return (
    <div
      className={cn(
        "w-fit flex items-center bg-background gap-2 px-3 py-1 rounded-full border",
        className,
      )}
    >
      <div
        data-status={status}
        className="size-2 group relative">
        <div
          className={cn(
            "absolute inset-0 size-2 animate-ping rounded-full",
            "group-data-[status=available]:bg-foreground",
            "group-data-[status=unavailable]:bg-destructive",
          )}
        />
        <div className={cn(
          "size-2 animate-pulse rounded-full",
          "group-data-[status=available]:bg-foreground",
          "group-data-[status=unavailable]:bg-destructive",
        )} />
      </div>
      <div data-status={status} className={cn(
        "flex items-center gap-1",
        "data-[status=available]:text-foreground",
        "data-[status=unavailable]:text-muted-foreground",
      )}>
        {label ? (
          label
        ) : (
          <Typewriter
            text={text}
            speed={100}
            loop={true}
            className="text-sm"
          />
        )}
      </div>
    </div>
  );
};

export const AvailabilitySkeleton = () => {
  return (
    <div className="w-fit h-[30px] flex items-center gap-2 px-3 py-1 rounded-full border">
      <div className="size-2 animate-pulse bg-secondary rounded-full" />
      <Skeleton className="w-32 h-4 rounded-full" />
    </div>
  );
};
export default Availability;
