"use client";
import { Calendar } from "@yz13/ui/components/calendar";
import { format, parse } from "date-fns";
import { ru } from "date-fns/locale";
import { useQueryState } from "nuqs";

export default function () {
  const [date, setDate] = useQueryState("date")
  const defaultDate = new Date()
  const parsed = date ? parse(date, "yyyy-MM-dd", new Date()) : defaultDate

  return <Calendar
    locale={ru}
    mode="single"
    selected={parsed}
    onSelect={(date) => setDate(format(date, "yyyy-MM-dd"))}
  />
}
