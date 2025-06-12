"use client";

import { Button } from "@yz13/ui/components/button";
import { format, parse } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useQueryState } from "nuqs";

export default function () {
  const [date] = useQueryState("date")
  const defaultDate = new Date()
  const parsed = date ? parse(date, "yyyy-MM-dd", new Date()) : defaultDate
  const formatted = format(parsed, "EEEE, dd MMMM", {
    locale: ru,
  });
  return (
    <Button variant="secondary" className="w-fit text-muted-foreground">
      <CalendarIcon className="lg:size-5 size-4" />
      <span className="lg:text-lg text-sm capitalize">
        {formatted}
      </span>
    </Button>
  )
}
