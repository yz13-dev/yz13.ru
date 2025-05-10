"use client ";

import { useTz } from "@/hooks/use-tz";
import { tz } from "@date-fns/tz";
import { addMinutes, format, parse, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { Separator } from "mono/components/separator";
import { Event } from "rest-api/types/calendar";

export default function ({ appointment }: { appointment: Event }) {
  const timezone = useTz();
  const parsedTime = parseISO(appointment.date_start, {
    in: tz(timezone),
  });
  const time = format(parsedTime, "HH:mm", {
    in: tz(timezone),
  });
  console.log(parsedTime);
  const note = appointment.description ?? "";
  const parsedDuration = parse(appointment.duration!, "HH:mm:ss", new Date());
  const date = format(parsedTime, "EEEE, d MMMM", {
    locale: ru,
    in: tz(timezone),
  });
  const duration = format(parsedDuration, "HH:mm");
  const end = addMinutes(
    parsedTime,
    parsedDuration.getMinutes() + parsedDuration.getHours() * 60,
  );
  const endTime = format(end, "HH:mm");
  return (
    <li key={appointment.id} className="flex flex-col gap-3 w-full">
      <div className="flex items-start w-full justify-between">
        <div className="flex flex-col items-start">
          <span className="text-sm text-foreground">{appointment.summary}</span>
          <span className="text-xs mt-1 capitalize text-muted-foreground">
            {date}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm text-muted-foreground">
            {time}-{endTime}
          </span>
          <span className="text-xs text-muted-foreground">{duration}</span>
        </div>
      </div>
      {note && <Separator />}
      {note && (
        <span className="text-sm text-muted-foreground">Заметка: {note}</span>
      )}
    </li>
  );
}
