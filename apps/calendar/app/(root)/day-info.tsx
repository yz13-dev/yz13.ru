"use client";

import { format, parse } from "date-fns";
import { ru } from "date-fns/locale";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

type DayInfoProps = {
  defaultDate?: string;
};
const parseDate = (date: string) => {
  return parse(date, "yyyy-MM-dd", new Date(), { locale: ru });
};
export default function DayInfo({ defaultDate }: DayInfoProps) {
  const today = defaultDate ? parseDate(defaultDate) : new Date();
  const date = format(today, "yyyy-MM-dd", { locale: ru });
  const label = format(today, "dd MMMM, yyyy", { locale: ru });
  const weekday = format(today, "EEEEEEE", { locale: ru });
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Link href={`/${date}`} className="text-lg font-medium capitalize">
          {label}
        </Link>
        <ArrowRightIcon size={16} />
      </div>
      <span className="text-base text-muted-foreground capitalize">
        {weekday}
      </span>
    </div>
  );
}
