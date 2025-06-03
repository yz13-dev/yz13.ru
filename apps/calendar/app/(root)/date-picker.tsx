"use client";

import { format, parse } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Calendar } from "mono/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "mono/components/popover";
import { useQueryState } from "nuqs";
import { useEffect } from "react";


export default function DatePicker() {
  const [date, setDate] = useQueryState("date", { shallow: false })
  const defaultDate = new Date()
  const parsed = date ? parse(date, "yyyy-MM-dd", new Date()) : defaultDate
  const formatted = format(parsed, "EEEE, dd MMMM", {
    locale: ru,
  });
  useEffect(() => {
    if (!date) setDate(format(defaultDate, "yyyy-MM-dd"))
  }, [date])
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="w-fit text-muted-foreground">
          <CalendarIcon className="lg:size-5 size-4" />
          <span className="lg:text-lg text-sm capitalize">
            {formatted}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 rounded-3xl" align="start">
        <Calendar
          mode="single"
          selected={parsed}
          locale={ru}
          onSelect={(date) => {
            if (!date) return;
            const newDate = format(date, "yyyy-MM-dd");
            setDate(newDate)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
