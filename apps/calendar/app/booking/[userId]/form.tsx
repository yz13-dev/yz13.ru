"use client";
import AutoTextarea from "@/components/auto-textarea";
import { format, parse } from "date-fns";
import { ru } from "date-fns/locale";
import { Button } from "mono/components/button";
import { Calendar } from "mono/components/calendar";
import { Input } from "mono/components/input";
import { Separator } from "mono/components/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "mono/components/tabs";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { ScheduleAvailability } from "rest-api/types/calendar";

export default function form({
  className = "",
  availability,
}: {
  className?: string;
  availability?: ScheduleAvailability;
}) {
  const defaultDate = format(new Date(), "yyyy-MM-dd");
  const [date, setDate] = useQueryState("date", { shallow: false });
  const [time, setTime] = useQueryState("time");
  const parsedDate = parse(date ?? defaultDate, "yyyy-MM-dd", new Date());
  const durations = Object.keys(availability?.availability ?? {});
  const [duration, setDuration] = useState<string | null>(durations[0] ?? null);
  const handleSelect = (date?: Date) => {
    if (!date) return;
    setDate(format(date, "yyyy-MM-dd"));
  };
  const disabled = duration === null || time === null;
  return (
    <>
      <div className="w-full divide-y">
        <div className="flex divide-x md:flex-row flex-col-reverse">
          <div className="md:w-2/3 p-6 w-full space-y-6">
            <Calendar
              mode="single"
              className="p-0"
              locale={ru}
              selected={parsedDate}
              onSelect={(date) => handleSelect(date)}
            />
            <Separator />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Имя *</span>
                <Input />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Почта *</span>
                <Input />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">
                  Заметка к созвону
                </span>
                <AutoTextarea className="border rounded-3xl px-3 py-2 min-h-16" />
              </div>
            </div>
          </div>
          <div className="md:w-1/3 max-h-[60dvh] overflow-auto w-full flex md:flex-col flex-row md:*:w-full *:w-fit">
            <Tabs value={duration ?? undefined} onValueChange={setDuration}>
              <div className="w-full p-6 bg-background-secondary sticky top-0 z-10">
                <TabsList className="w-full">
                  {durations
                    .sort((a, b) => a.localeCompare(b))
                    .map((duration) => {
                      return (
                        <TabsTrigger key={duration} value={duration}>
                          {duration}
                        </TabsTrigger>
                      );
                    })}
                </TabsList>
              </div>
              {durations.map((duration) => {
                const times = availability?.availability[duration] ?? [];
                return (
                  <TabsContent
                    key={duration}
                    value={duration}
                    className="px-6 pb-6"
                  >
                    <ul className="w-full space-y-3">
                      {times.map((availableTime) => {
                        const selected = availableTime === time;
                        return (
                          <li key={availableTime}>
                            <Button
                              variant={selected ? "default" : "outline"}
                              className="w-full"
                              onClick={() => {
                                if (selected) setTime(null);
                                else setTime(availableTime);
                              }}
                            >
                              {availableTime}
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </div>
        <div className="w-full flex justify-end px-6 py-3">
          <Button disabled={disabled}>Подтвердить</Button>
        </div>
      </div>
    </>
  );
}
