import { adaptWeekSchedule } from "@/lib/schedule";
import { getSchedule } from "@yz13/api/calendar/schedule";
import type { DaySchedule, WeekSchedule } from "@yz13/api/types/calendar";
import { Badge } from "@yz13/ui/components/badge";
import { Separator } from "@yz13/ui/components/separator";
import { Skeleton } from "@yz13/ui/components/skeleton";
import { format, parse } from "date-fns";
import { Edit3Icon } from "lucide-react";
import EditScheduleModal from "./edit-schedule-modal";
import NewScheduleButton from "./new-schedule-button";
import ScheduleList from "./schedule-list";
const EmptySchedule = () => {
  return (
    <div className="w-full h-fit p-8 border rounded-xl border-dashed flex flex-col items-center justify-center gap-4">
      <span className="text-sm text-muted-foreground">Нет расписания</span>
    </div>
  );
};

const DayScheduleItem = ({
  schedule,
  label,
}: {
  label?: string;
  schedule: DaySchedule[];
}) => {
  const max = 2;
  return (
    <>
      <span className="text-sm w-6 shrink-0 text-muted-foreground">{label}:</span>
      {!schedule.length && <Badge variant="secondary">Нет расписания</Badge>}
      {schedule &&
        <ScheduleList schedule={schedule} max={max} />
      }
      {schedule.length >= max + 1 && (
        <Badge variant="secondary">+{schedule.length - max}</Badge>
      )}
    </>
  );
};

const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export default async function Section({
  uid,
  calendarId,
  timezone = localTimezone
}: {
  uid: string | null,
  calendarId?: string
  timezone?: string
}) {
  if (!uid) return <EmptySchedule />;
  const { data } = await getSchedule(uid);
  const schedule = adaptWeekSchedule(data as WeekSchedule, timezone);
  const hasSchedule = !!data;
  const monday = (schedule?.monday ?? []) as DaySchedule[];
  const tuesday = (schedule?.tuesday ?? []) as DaySchedule[];
  const wednesday = (schedule?.wednesday ?? []) as DaySchedule[];
  const thursday = (schedule?.thursday ?? []) as DaySchedule[];
  const friday = (schedule?.friday ?? []) as DaySchedule[];
  const saturday = (schedule?.saturday ?? []) as DaySchedule[];
  const sunday = (schedule?.sunday ?? []) as DaySchedule[];
  const durations = schedule?.durations ?? [];
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-medium text-lg block">Расписание</span>
          {/* <button className="text-lg font-medium flex items-center gap-2">
            <span>Расписание</span>
            <ArrowRightIcon size={16} />
          </button> */}
          {schedule && (
            <EditScheduleModal
              uid={uid}
              defaultSchedule={schedule}
              defaultDurations={durations}
            >
              <button type="button" className="placeholder:opacity-50 text-sm flex items-center gap-2 text-muted-foreground hover:text-foreground">
                Изменить
                <Edit3Icon size={16} />
              </button>
            </EditScheduleModal>
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          Время когда другие пользователи могут запланировать с вами созвон.
        </span>
      </div>
      {hasSchedule ? (
        <ul className="w-full space-y-6">
          <li className="flex flex-row [&>div]:w-full [&>div]:justify-between w-full gap-3">
            <DayScheduleItem schedule={monday} label="Пн" />
          </li>
          <li className="flex flex-row [&>div]:w-full [&>div]:justify-between w-full gap-3">
            <DayScheduleItem schedule={tuesday} label="Вт" />
          </li>
          <li className="flex flex-row [&>div]:w-full [&>div]:justify-between w-full gap-3">
            <DayScheduleItem schedule={wednesday} label="Ср" />
          </li>
          <li className="flex flex-row [&>div]:w-full [&>div]:justify-between w-full gap-3">
            <DayScheduleItem schedule={thursday} label="Чт" />
          </li>
          <li className="flex flex-row [&>div]:w-full [&>div]:justify-between w-full gap-3">
            <DayScheduleItem schedule={friday} label="Пт" />
          </li>
          <li className="flex flex-row [&>div]:w-full [&>div]:justify-between w-full gap-3">
            <DayScheduleItem schedule={saturday} label="Сб" />
          </li>
          <li className="flex flex-row [&>div]:w-full [&>div]:justify-between w-full gap-3">
            <DayScheduleItem schedule={sunday} label="Вс" />
          </li>
        </ul>
      ) : (
        <NewScheduleButton uid={uid} calendarId={calendarId} />
      )}
      {!!durations.length && (
        <>
          <Separator />
          <div className="space-y-3">
            <span className="text-sm block text-muted-foreground">
              Выбраная длительность созвона
            </span>
            <ul className="flex items-start gap-2 flex-wrap">
              {durations
                .sort((a, b) => a.localeCompare(b))
                .map((duration) => {
                  const parsed = parse(duration, "HH:mm:ss", new Date());
                  return (
                    <li key={duration}>
                      <Badge variant="secondary">
                        {format(parsed, "HH:mm")}
                      </Badge>
                    </li>
                  );
                })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export const SectionSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-0">
        <div className="flex w-full gap-4 items-center justify-between">
          <span className="font-medium block">Расписание</span>
          <Skeleton className="w-16 h-5 rounded-full" />
        </div>
        <span className="text-sm text-muted-foreground">
          Время когда другие пользователи могут запланировать с вами созвон.
        </span>
      </div>
    </div>
  );
};
