import { Typewriter } from "@/components/text-writter";
import { availableForWork } from "@yz13/flags";
import { cn } from "@yz13/ui/cn";
import { Skeleton } from "@yz13/ui/components/skeleton";
import type { ReactNode } from "react";

type AvailabilityProps = {
  label?: ReactNode;
  className?: string;
  size?: "sm" | "default" | "lg";
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
  "В тисках дедлайнов",
  "Завален работой"
];

const Availability = async ({
  label,
  className = "",
  size = "default"
}: AvailabilityProps) => {
  const available = await availableForWork();
  const status: "available" | "unavailable" = available
    ? "available"
    : "unavailable";

  const text = status === "available" ? availableTexts : unavailableTexts;
  return (
    <div
      data-size={size}
      className={cn(
        "w-fit group flex items-center bg-background gap-2 rounded-full border",
        "data-[size=sm]:px-2.5 data-[size=sm]:py-0.5",
        "data-[size=default]:px-3 data-[size=default]:py-1",
        "data-[size=lg]:px-4 data-[size=lg]:py-1.5",
        className,
      )}
    >
      <div
        data-status={status}
        className={cn(
          "group relative",
          "group-data-[size=sm]:size-1",
          "group-data-[size=default]:size-2",
          "group-data-[size=lg]:size-3",
        )}>
        <div
          className={cn(
            "absolute inset-0 animate-ping rounded-full",
            "group-data-[status=available]:bg-foreground",
            "group-data-[status=unavailable]:bg-destructive",
            "group-data-[size=sm]:size-1",
            "group-data-[size=default]:size-2",
            "group-data-[size=lg]:size-3",
          )}
        />
        <div className={cn(
          "animate-pulse rounded-full",
          "group-data-[status=available]:bg-foreground",
          "group-data-[status=unavailable]:bg-destructive",
          "group-data-[size=sm]:size-1",
          "group-data-[size=default]:size-2",
          "group-data-[size=lg]:size-3",
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
            className={cn(
              "group-data-[size=sm]:text-xs",
              "group-data-[size=default]:text-sm",
              "group-data-[size=lg]:text-base",
            )}
          />
        )}
      </div>
    </div>
  );
};

export const AvailabilitySkeleton = ({ size = "default" }: { size?: AvailabilityProps["size"] }) => {
  return (
    <Skeleton
      data-size={size}
      className={cn(
        "w-48 rounded-full",
        "data-[size=sm]:h-[22px]",
        "data-[size=default]:h-[30px]",
        "data-[size=lg]:h-[38px]",
      )}
    />
  );
};
export default Availability;
