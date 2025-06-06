"use client";
import { tz } from "@date-fns/tz";
import { format, parse } from "date-fns";
import { isEqual } from "lodash";
import { Loader2Icon, PlusIcon, XIcon } from "lucide-react";
import { Badge } from "mono/components/badge";
import { Button } from "mono/components/button";
import { Checkbox } from "mono/components/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "mono/components/dialog";
import { Input } from "mono/components/input";
import { Separator } from "mono/components/separator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateSchedule } from "rest-api/calendar/schedule";
import type {
  DaySchedule,
  UpdateWeekSchedule,
  WeekSchedule,
} from "rest-api/types/calendar";

const ScheduleItem = ({
  schedule,
  onScheduleChange,
  onDelete,
}: {
  schedule: DaySchedule;
  onScheduleChange?: (schedule: DaySchedule) => void;
  onDelete?: () => void;
}) => {
  const [innerSchedule, setInnerSchedule] = useState(schedule);
  const startTime = innerSchedule.start;
  const endTime = innerSchedule.end;
  const validateTimes = (start: string, end: string) => {
    const startTime = parse(start, "HH:mm", new Date());
    const endTime = parse(end, "HH:mm", new Date());
    const startHours = startTime.getHours();
    const startMinutes = startTime.getMinutes();
    const endHours = endTime.getHours();
    const endMinutes = endTime.getMinutes();
    const isStartBeforeEnd =
      startHours < endHours ||
      (startHours === endHours && startMinutes < endMinutes);
    return isStartBeforeEnd;
  };
  const isValid = validateTimes(startTime, endTime);
  const disabled = !innerSchedule.enabled;
  const updateStartTime = (time: string) => {
    setInnerSchedule((prev) => ({ ...prev, start: time }));
    // onScheduleChange?.(innerSchedule);
  };
  const updateEndTime = (time: string) => {
    setInnerSchedule((prev) => ({ ...prev, end: time }));
    // onScheduleChange?.(innerSchedule);
  };
  const updateSchedule = (schedule: Partial<DaySchedule>) => {
    setInnerSchedule((prev) => ({ ...prev, ...schedule }));
    // onScheduleChange?.(innerSchedule);
  };
  useEffect(() => {
    if (onScheduleChange) onScheduleChange(innerSchedule);
  }, [innerSchedule]);
  return (
    <div className="flex gap-2 flex-col w-full">
      <div className="flex items-center gap-2">
        <Checkbox
          className="rounded-full"
          checked={innerSchedule.enabled}
          onCheckedChange={(checked) => {
            const value = typeof checked === "boolean" ? checked : false;
            updateSchedule({ enabled: value });
          }}
        />
        <div className="flex flex-row w-full *:w-1/2 gap-2">
          <Input
            type="time"
            aria-invalid={!isValid}
            disabled={disabled}
            value={startTime}
            onChange={(e) => updateStartTime(e.target.value)}
            className="text-center aria-invalid:border-destructive aria-invalid:bg-destructive/40"
          />
          <Input
            type="time"
            aria-invalid={!isValid}
            disabled={disabled}
            value={endTime}
            onChange={(e) => updateEndTime(e.target.value)}
            className="text-center aria-invalid:border-destructive aria-invalid:bg-destructive/40"
          />
        </div>
        <Button
          disabled={!onDelete}
          onClick={onDelete}
          size="icon"
          variant="ghost"
        >
          <XIcon size={16} />
        </Button>
      </div>
    </div>
  );
};

const localDurations = ["00:15", "00:30", "00:45", "01:00"];

const prepareSchedule = (schedule: DaySchedule[]): DaySchedule[] => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return schedule.map((item) => {
    const start = parse(item.start, "HH:mm", new Date(), {
      in: tz(timezone),
    });
    const end = parse(item.end, "HH:mm", new Date(), {
      in: tz(timezone),
    });
    return {
      enabled: item.enabled,
      start: format(start, "HH:mm", {
        in: tz("UTC"),
      }),
      end: format(end, "HH:mm", {
        in: tz("UTC"),
      }),
    };
  })
};

export default function EditScheduleModal({
  children,
  uid,
  defaultSchedule,
  defaultDurations = [],
}: {
  defaultSchedule?: WeekSchedule;
  defaultDurations?: string[];
  uid: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [durations, setDurations] = useState<string[]>(defaultDurations);
  const [loading, setLoading] = useState<boolean>(false);
  const [monday, setMonday] = useState<DaySchedule[]>(
    ((defaultSchedule?.monday as DaySchedule[]) ?? []),
  );
  const [tuesday, setTuesday] = useState<DaySchedule[]>(
    ((defaultSchedule?.tuesday as DaySchedule[]) ?? []),
  );
  const [wednesday, setWednesday] = useState<DaySchedule[]>(
    ((defaultSchedule?.wednesday as DaySchedule[]) ?? []),
  );
  const [thursday, setThursday] = useState<DaySchedule[]>(
    ((defaultSchedule?.thursday as DaySchedule[])) ?? [],
  );
  const [friday, setFriday] = useState<DaySchedule[]>(
    ((defaultSchedule?.friday as DaySchedule[]) ?? []),
  );
  const [saturday, setSaturday] = useState<DaySchedule[]>(
    ((defaultSchedule?.saturday as DaySchedule[]) ?? []),
  );
  const [sunday, setSunday] = useState<DaySchedule[]>(
    ((defaultSchedule?.sunday as DaySchedule[]) ?? []),
  );

  const getChanges = () => {
    const initialSchedule: UpdateWeekSchedule = {
      monday: (defaultSchedule?.monday as DaySchedule[]) ?? [],
      tuesday: (defaultSchedule?.tuesday as DaySchedule[]) ?? [],
      wednesday: (defaultSchedule?.wednesday as DaySchedule[]) ?? [],
      thursday: (defaultSchedule?.thursday as DaySchedule[]) ?? [],
      friday: (defaultSchedule?.friday as DaySchedule[]) ?? [],
      saturday: (defaultSchedule?.saturday as DaySchedule[]) ?? [],
      sunday: (defaultSchedule?.sunday as DaySchedule[]) ?? [],
    };
    const currentSchedule: UpdateWeekSchedule = {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    };
    return isEqual(initialSchedule, currentSchedule);
  };

  const disabled = loading ? loading : getChanges();

  const addSchedule = (day: keyof WeekSchedule, schedule: DaySchedule) => {
    if (day === "monday") {
      setMonday((prev) => [...prev, schedule]);
    } else if (day === "tuesday") {
      setTuesday((prev) => [...prev, schedule]);
    } else if (day === "wednesday") {
      setWednesday((prev) => [...prev, schedule]);
    } else if (day === "thursday") {
      setThursday((prev) => [...prev, schedule]);
    } else if (day === "friday") {
      setFriday((prev) => [...prev, schedule]);
    } else if (day === "saturday") {
      setSaturday((prev) => [...prev, schedule]);
    } else if (day === "sunday") {
      setSunday((prev) => [...prev, schedule]);
    }
  };
  const changeSchedule = (
    day: keyof WeekSchedule,
    index: number,
    schedule: DaySchedule,
  ) => {
    if (day === "monday") {
      const updated = [...monday].map((item, i) =>
        i === index ? schedule : item,
      );
      setMonday(updated);
    } else if (day === "tuesday") {
      const updated = [...tuesday].map((item, i) =>
        i === index ? schedule : item,
      );
      setTuesday(updated);
    } else if (day === "wednesday") {
      const updated = [...wednesday].map((item, i) =>
        i === index ? schedule : item,
      );
      setWednesday(updated);
    } else if (day === "thursday") {
      const updated = [...thursday].map((item, i) =>
        i === index ? schedule : item,
      );
      setThursday(updated);
    } else if (day === "friday") {
      const updated = [...friday].map((item, i) =>
        i === index ? schedule : item,
      );
      setFriday(updated);
    } else if (day === "saturday") {
      const updated = [...saturday].map((item, i) =>
        i === index ? schedule : item,
      );
      setSaturday(updated);
    } else if (day === "sunday") {
      const updated = [...sunday].map((item, i) =>
        i === index ? schedule : item,
      );
      setSunday(updated);
    }
  };
  const removeSchedule = (day: keyof WeekSchedule, index: number) => {
    if (day === "monday") {
      setMonday((prev) => prev.filter((_, i) => i !== index));
    } else if (day === "tuesday") {
      setTuesday((prev) => prev.filter((_, i) => i !== index));
    } else if (day === "wednesday") {
      setWednesday((prev) => prev.filter((_, i) => i !== index));
    } else if (day === "thursday") {
      setThursday((prev) => prev.filter((_, i) => i !== index));
    } else if (day === "friday") {
      setFriday((prev) => prev.filter((_, i) => i !== index));
    } else if (day === "saturday") {
      setSaturday((prev) => prev.filter((_, i) => i !== index));
    } else if (day === "sunday") {
      setSunday((prev) => prev.filter((_, i) => i !== index));
    }
  };
  const getEmptySchedule = (): DaySchedule => {
    return {
      start: "00:00",
      end: "00:00",
      enabled: true,
    };
  };
  const router = useRouter();
  const updateWeekSchedule = async () => {
    const weekSchedule: UpdateWeekSchedule = {
      durations,
      monday: prepareSchedule(monday),
      tuesday: prepareSchedule(tuesday),
      wednesday: prepareSchedule(wednesday),
      thursday: prepareSchedule(thursday),
      friday: prepareSchedule(friday),
      saturday: prepareSchedule(saturday),
      sunday: prepareSchedule(sunday),
    };
    setLoading(true);
    try {
      const { data: updated } = await updateSchedule(uid, weekSchedule);
      if (updated) {
        setDurations(updated.durations ?? []);
        setMonday(updated.monday as DaySchedule[]);
        setTuesday(updated.tuesday as DaySchedule[]);
        setWednesday(updated.wednesday as DaySchedule[]);
        setThursday(updated.thursday as DaySchedule[]);
        setFriday(updated.friday as DaySchedule[]);
        setSaturday(updated.saturday as DaySchedule[]);
        setSunday(updated.sunday as DaySchedule[]);
        router.refresh();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDuration = (duration: string) => {
    if (durations.includes(duration)) {
      setDurations((prev) => prev.filter((item) => item !== duration));
    } else {
      setDurations((prev) => [...prev, duration]);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="rounded-3xl max-h-dvh !max-w-2xl w-full overflow-y-auto">
        <div className="*:block space-y-2">
          <DialogTitle>Редактировать расписание</DialogTitle>
          <DialogDescription>
            Здесь мы можете редактировать ваше расписание.
          </DialogDescription>
        </div>
        <Separator />
        <span className="text-sm text-muted-foreground">
          Выберите длительность созвонов
        </span>
        <ul className="flex items-start gap-2 flex-wrap">
          {localDurations.map((duration) => {
            const parsedLocalDuration = parse(duration, "HH:mm", new Date());
            const formatted = format(parsedLocalDuration, "HH:mm:ss");
            const selected = durations.includes(formatted);
            return (
              <li
                key={duration}
                onClick={() => handleDuration(formatted)}
                className="hover:cursor-pointer"
              >
                <Badge variant={selected ? "default" : "secondary"}>
                  {duration}
                </Badge>
              </li>
            );
          })}
        </ul>
        <Separator />
        <span className="text-sm text-muted-foreground">
          Определите ваше расписание
        </span>
        <ul className="w-full grid md:grid-cols-2 grid-cols-1 gap-6">
          <WeekdayItem
            weekday="monday"
            label="Понедельник"
            schedule={monday}
            onChange={changeSchedule}
            onDeleteSchedule={removeSchedule}
            onNewSchedule={(weekday) =>
              addSchedule(weekday, getEmptySchedule())
            }
          />
          <WeekdayItem
            weekday="tuesday"
            label="Вторник"
            schedule={tuesday}
            onChange={changeSchedule}
            onDeleteSchedule={removeSchedule}
            onNewSchedule={(weekday) =>
              addSchedule(weekday, getEmptySchedule())
            }
          />
          <WeekdayItem
            weekday="wednesday"
            label="Среда"
            schedule={wednesday}
            onChange={changeSchedule}
            onDeleteSchedule={removeSchedule}
            onNewSchedule={(weekday) =>
              addSchedule(weekday, getEmptySchedule())
            }
          />
          <WeekdayItem
            weekday="thursday"
            label="Четверг"
            schedule={thursday}
            onChange={changeSchedule}
            onDeleteSchedule={removeSchedule}
            onNewSchedule={(weekday) =>
              addSchedule(weekday, getEmptySchedule())
            }
          />
          <WeekdayItem
            weekday="friday"
            label="Пятница"
            schedule={friday}
            onChange={changeSchedule}
            onDeleteSchedule={removeSchedule}
            onNewSchedule={(weekday) =>
              addSchedule(weekday, getEmptySchedule())
            }
          />
          <WeekdayItem
            weekday="saturday"
            label="Суббота"
            schedule={saturday}
            onChange={changeSchedule}
            onDeleteSchedule={removeSchedule}
            onNewSchedule={(weekday) =>
              addSchedule(weekday, getEmptySchedule())
            }
          />
          <WeekdayItem
            weekday="sunday"
            label="Воскресенье"
            schedule={sunday}
            onChange={changeSchedule}
            onDeleteSchedule={removeSchedule}
            onNewSchedule={(weekday) =>
              addSchedule(weekday, getEmptySchedule())
            }
          />
        </ul>
        <DialogFooter>
          <Button onClick={updateWeekSchedule} disabled={disabled}>
            {loading && <Loader2Icon size={16} className="animate-spin" />}
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const WeekdayItem = ({
  weekday,
  label,
  schedule = [],
  onChange,
  onDeleteSchedule,
  onNewSchedule,
}: {
  weekday: keyof WeekSchedule;
  onChange?: (
    weekday: keyof WeekSchedule,
    index: number,
    schedule: DaySchedule,
  ) => void;
  onNewSchedule?: (weekday: keyof WeekSchedule) => void;
  onDeleteSchedule?: (weekday: keyof WeekSchedule, index: number) => void;
  label?: string;
  schedule?: DaySchedule[];
}) => {
  return (
    <li className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between">
        <span className="text-sm shrink-0">{label}</span>
        <Button
          variant="secondary"
          className="size-7"
          size="icon"
          onClick={() => {
            if (onNewSchedule) onNewSchedule(weekday)
          }}
        >
          <PlusIcon size={16} />
        </Button>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {schedule.map((item, index) => {
          const key = `sunday-${index}`;
          return (
            <ScheduleItem
              schedule={item}
              key={key}
              onScheduleChange={(schedule) => {
                if (onChange) onChange(weekday, index, schedule);
              }}
              onDelete={() => {
                if (onDeleteSchedule) onDeleteSchedule(weekday, index)
              }}
            />
          );
        })}
      </div>
    </li>
  );
};
