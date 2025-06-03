"use client";

import { getStatusLabel } from "@/const/status-map";
import { useTz } from "@/hooks/use-tz";
import { tz } from "@date-fns/tz";
import { addMinutes, format, parse, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { ExternalLink } from "lucide-react";
import { Badge } from "mono/components/badge";
import { Separator } from "mono/components/separator";
import Link from "next/link";
import type { Event } from "rest-api/types/calendar";

export default function ({ appointment }: { appointment: Event }) {
  const timezone = useTz();
  const parsedTime = parseISO(appointment.date_start, {
    in: tz(timezone),
  });
  const time = format(parsedTime, "HH:mm", {
    in: tz(timezone),
  });
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

  const status = appointment.status;

  const callPage = `/call/${appointment.id}`;
  return (
    <li key={appointment.id} className="flex flex-col gap-3 w-full">
      <div className="flex items-start w-full justify-between">
        <div className="flex flex-col items-start">

          <Link href={callPage} className="text-sm text-foreground inline-flex items-center gap-1 hover:underline">{appointment.summary}
            <ExternalLink size={12} />
          </Link>
          <span className="text-xs mt-1 capitalize text-muted-foreground">
            {date}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm text-muted-foreground">
            {time}-{endTime}
          </span>
          {
            status &&
            <Badge variant={status === "CANCELLED" ? "destructive" : status === "TENTATIVE" ? "secondary" : "default"}>{getStatusLabel(status)}</Badge>
          }
        </div>
      </div>
      {note && <Separator />}
      {note && (
        <span className="text-sm text-muted-foreground">Заметка: {note}</span>
      )}
    </li>
  );
}
