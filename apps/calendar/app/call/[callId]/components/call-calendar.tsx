"use client"
import type { Event } from "@yz13/api/types/calendar";
import { Calendar } from "@yz13/ui/components/calendar";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";



export default function ({ call }: { call: Event }) {

  const startAt = parseISO(call.date_start)
  // const endAt = parseISO(call.date_end);

  return (
    <Calendar
      className="p-0"
      mode="single"
      selected={startAt}
      disableNavigation
      locale={ru}
      disabled={date => {
        const dateKey = format(date, "yyyy-MM-dd");
        const startKey = format(startAt, "yyyy-MM-dd");
        return dateKey !== startKey;
      }}
    />
  )
}
