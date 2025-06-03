import { showLinkToCalendar } from "@yz13/flags";
import { format, parse } from "date-fns";
import { ru } from "date-fns/locale";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "yz13/cn";
import HeaderTime from "./header-time";

type DayInfoProps = {
  defaultDate?: string;
  className?: string;
};
const parseDate = (date: string) => {
  return parse(date, "yyyy-MM-dd", new Date(), { locale: ru });
};
export default async function DayInfo({ defaultDate, className = "" }: DayInfoProps) {
  const today = defaultDate ? parseDate(defaultDate) : new Date();
  const date = format(today, "yyyy-MM-dd", { locale: ru });
  const label = format(today, "dd MMMM, yyyy", { locale: ru });
  const weekday = format(today, "EEEEEEE", { locale: ru });
  const showLink = await showLinkToCalendar();
  return (
    <div className={cn("flex items-center gap-2 justify-between", className)}>
      <div className="flex flex-col">
        <HeaderTime />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          {showLink ? (
            <Link
              href={`/${date}`}
              className="text-lg inline-flex items-center gap-2 font-medium capitalize"
            >
              {label}
              <ArrowRightIcon size={16} />
            </Link>
          ) : (
            <span className="text-lg font-medium capitalize">{label}</span>
          )}
        </div>
        <span className="text-base text-muted-foreground capitalize">
          {weekday}
        </span>
      </div>
    </div>
  );
}
