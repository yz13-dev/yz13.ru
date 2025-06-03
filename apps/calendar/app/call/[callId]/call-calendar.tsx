"use client"
import { type Interval, isWithinInterval, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar } from "mono/components/calendar";
import type { Event } from "rest-api/types/calendar";



export default function ({ call }: { call: Event }) {

  const startAt = parseISO(call.date_start)
  const endAt = parseISO(call.date_end);

  const dateInterval: Interval = {
    start: startAt,
    end: endAt
  }

  return (
    <Calendar
      className="p-0"
      mode="range"
      selected={{
        from: startAt,
        to: endAt,
      }}
      disableNavigation
      locale={ru}
      disabled={date => !isWithinInterval(date, dateInterval)}
    />
  )
}
