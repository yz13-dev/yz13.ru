"use client"
import { adaptSchedule } from "@/lib/schedule";
import { tz } from "@date-fns/tz";
import { format, parse } from "date-fns";
import { Badge } from "mono/components/badge";
import { Separator } from "mono/components/separator";
import type { DaySchedule } from "rest-api/types/calendar";


export default function ({ schedule = [], max = 2 }: { schedule?: DaySchedule[], max?: number }) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const schedules = schedule.slice(0, max);
  return (
    <>
      {
        adaptSchedule(
          schedules, timezone
        )
          .map((item, index) => {
            const schedule = item as DaySchedule;
            const startTime = schedule.start;
            const endTime = schedule.end;
            const start = parse(startTime, "HH:mm", new Date(), {
              in: tz(timezone),
            });
            const end = parse(endTime, "HH:mm", new Date(), {
              in: tz(timezone),
            });
            return (
              <div
                key={`monday-${index}`}
                className="flex flex-row items-center justify-center gap-2"
              >
                <Badge variant="secondary">
                  {format(start, "HH:mm", {
                    in: tz(timezone),
                  })}
                </Badge>
                <Separator className="w-full shrink" />
                <Badge variant="secondary">
                  {format(end, "HH:mm", {
                    in: tz(timezone),
                  })}
                </Badge>
              </div>
            );
          })
      }
    </>
  )
}
