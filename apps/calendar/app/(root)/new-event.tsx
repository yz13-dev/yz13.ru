"use client";
import AutoTextarea from "@/components/auto-textarea";
import {
  addHours,
  addMinutes,
  format,
  parse,
  setHours,
  setMinutes,
} from "date-fns";
import { ru } from "date-fns/locale";
import { AlignLeftIcon, ClockIcon, Loader2Icon, XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Checkbox } from "mono/components/checkbox";
import { Input } from "mono/components/input";
import { Label } from "mono/components/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "mono/components/popover";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { createEvent } from "rest-api/calendar";
import { NewEvent } from "rest-api/types/calendar";

type EventForm = {
  uid: string | null;
  date?: string;
  children?: ReactNode;
};
export default function NewEventForm({
  children,
  uid,
  date = format(new Date(), "yyyy-MM-dd"),
}: EventForm) {
  const [open, setOpen] = useState<boolean>(false);
  const [allDay, setAllDay] = useState<boolean>(false);
  const pickedDate = parse(date, "yyyy-MM-dd", new Date());
  const [startTime, setStartTime] = useState<string>("00:00");
  const [endTime, setEndTime] = useState<string>("00:00");
  const [editTime, setEditTime] = useState<boolean>(false);
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const clearForm = () => {
    setAllDay(false);
    setStartTime("00:00");
    setEndTime("00:00");
    setEditTime(false);
    setEditDescription(false);
    setDescription("");
  };
  const handleNewEvent = async () => {
    if (!uid) return;
    setLoading(true);
    try {
      const start_time = parse(startTime, "HH:mm", new Date());
      const end_time = parse(endTime, "HH:mm", new Date());

      const durationInHours = end_time.getHours() - start_time.getHours();
      const durationInMinutes = end_time.getMinutes() - start_time.getMinutes();
      const duration = `${durationInHours}:${durationInMinutes}`;
      const date_start = setMinutes(
        setHours(new Date(), start_time.getHours()),
        start_time.getMinutes(),
      );
      const date_end = addMinutes(
        addHours(date_start, end_time.getHours()),
        end_time.getMinutes(),
      );
      const event: NewEvent = {
        summary: summary ?? "New event",
        date_start: date_start.toISOString(),
        date_end: allDay ? null : date_end.toISOString(),
        all_day: allDay,
        duration: allDay ? null : duration,
        description: description,
        uid,
      };
      const createdEvent = await createEvent(event);
      if (createdEvent) {
        clearForm();
        router.refresh();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="rounded-3xl">
        <div className="flex flex-col gap-6">
          <Input
            placeholder="Название события"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="all-day"
                checked={allDay}
                onCheckedChange={(checked) => setAllDay(checked as boolean)}
              />
              <Label htmlFor="all-day" className="text-xs">
                Весь день
              </Label>
            </div>
            <div
              className="flex group items-start gap-3"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setEditTime(true);
              }}
            >
              <ClockIcon
                size={16}
                className="shrink-0 mt-2.5 text-muted-foreground group-hover:text-foreground"
              />
              <div className="flex w-full flex-col gap-1">
                <div className="flex w-full items-center justify-between">
                  <span className="text-xs capitalize">
                    {format(pickedDate, "EEEE, d MMMM", {
                      locale: ru,
                    })}
                  </span>
                  {editTime && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setEditTime(false);
                      }}
                      className="text-xs text-muted-foreground hover:text-foreground size-4 flex items-center justify-center"
                    >
                      <XIcon size={16} />
                    </button>
                  )}
                </div>
                {editTime ? (
                  <div className="flex flex-row gap-4 *:w-1/2">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-muted-foreground">
                        Начало
                      </span>
                      <Input
                        className="w-full text-center h-7"
                        type="time"
                        placeholder="00:00"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-muted-foreground">
                        Конец
                      </span>
                      <Input
                        className="w-full text-center h-7"
                        type="time"
                        placeholder="00:00"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground capitalize">
                    {allDay ? "Весь день" : `${startTime} - ${endTime}`}
                  </span>
                )}
              </div>
            </div>
            <div
              className="flex group items-start gap-3"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setEditDescription(true);
              }}
            >
              <AlignLeftIcon
                size={16}
                className="shrink-0 text-muted-foreground group-hover:text-foreground"
              />
              <div className="flex w-full flex-col gap-1">
                {editDescription ? (
                  <AutoTextarea
                    className="text-xs p-0"
                    placeholder="Описание события"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Добавить описание
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button disabled variant="ghost">
              Больше
            </Button>
            <Button disabled={loading} onClick={handleNewEvent}>
              {loading && <Loader2Icon size={16} className="animate-spin" />}
              Создать
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
