"use client";
import { CalendarLocale, locales } from "@/const/locale-to-country";
import { format, isFuture, parse } from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar } from "@yz13/ui/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@yz13/ui/components/popover";
import { useRouter } from "next/navigation";

type Props = {
  children?: React.ReactNode;
  locale?: CalendarLocale;
  date?: string;
};

export default function ({
  children,
  locale = "ru",
  date = format(new Date(), "yyyy-MM-dd"),
}: Props) {
  const router = useRouter();
  const currentLocale = locales[locale] ?? enUS;
  const currentDate = parse(date, "yyyy-MM-dd", new Date());
  return (
    <Popover>
      <PopoverTrigger asChild={!!children}>{children}</PopoverTrigger>
      <PopoverContent className="p-0 rounded-3xl">
        <Calendar
          mode="single"
          selected={currentDate}
          locale={currentLocale}
          onSelect={(date) => {
            if (!date) return;
            const newDate = format(date, "yyyy-MM-dd");
            router.push(`/${newDate}`);
          }}
          disabled={(date) => {
            return isFuture(date);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
