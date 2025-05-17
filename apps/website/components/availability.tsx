import { Typewriter } from "@/components/text-writter";
import { availableForWork } from "@/const/flags";
import { Skeleton } from "mono/components/skeleton";
import { ReactNode } from "react";
import { cn } from "yz13/cn";

type AvailabilityProps = {
  label?: ReactNode;
  className?: string;
};

const availableTexts = ["Открыт для заказов", "Закажите какой-нибудь проект"];
const unavailableTexts = [
  "Работаю над заказами",
  "Есть пара заказов",
  "Делаю вид что работаю",
];

const Availability = async ({ label, className = "" }: AvailabilityProps) => {
  const isBusy = await availableForWork();
  const status: "available" | "unavailable" = isBusy
    ? "unavailable"
    : "available";

  const text = status === "available" ? availableTexts : unavailableTexts;
  return (
    <div
      className={cn(
        "w-fit flex items-center bg-background gap-2 px-3 py-1 rounded-full border",
        className,
      )}
    >
      <div className="size-2 relative">
        <div
          className={cn(
            "absolute inset-0 size-2 animate-ping rounded-full",
            isBusy ? "bg-red-foreground" : "bg-green-foreground",
          )}
        />
        <div className="size-2 animate-pulse bg-red-foreground rounded-full" />
      </div>
      <div className="flex items-center gap-1">
        {label ? (
          label
        ) : (
          <Typewriter
            text={text}
            speed={100}
            loop={true}
            className="text-sm text-muted-foreground"
          />
        )}
      </div>
    </div>
  );
};

export const AvailabilitySkeleton = () => {
  return (
    <div className="w-fit flex items-center gap-2 px-3 py-1 rounded-full border">
      <div className="size-2 animate-pulse bg-secondary rounded-full" />
      <Skeleton className="w-32 h-4 rounded-full" />
    </div>
  );
};
export default Availability;
