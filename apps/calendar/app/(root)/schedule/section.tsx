import { tz } from "@date-fns/tz";
import { format, parse } from "date-fns";
import { ArrowRightIcon, Edit3Icon } from "lucide-react";
import { Badge } from "mono/components/badge";
import { Separator } from "mono/components/separator";
import { Skeleton } from "mono/components/skeleton";
import { getSchedule } from "rest-api/calendar/schedule";
import { DaySchedule } from "rest-api/types/calendar";
import EditScheduleModal from "./edit-schedule-modal";
import NewScheduleButton from "./new-schedule-button";
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
      <span className="text-sm text-muted-foreground">{label}:</span>
      {!schedule.length && <Badge variant="secondary">Нет расписания</Badge>}
      {schedule &&
        schedule.slice(0, max).map((item, index) => {
          const schedule = item as DaySchedule;
          const startTime = schedule.start.time;
          const startTz = schedule.start.tz;
          const endTime = schedule.end.time;
          const endTz = schedule.end.tz;
          const start = parse(startTime, "HH:mm", new Date(), {
            in: tz(startTz),
          });
          const end = parse(endTime, "HH:mm", new Date(), {
            in: tz(endTz),
          });
          return (
            <div
              key={`monday-${index}`}
              className="flex flex-row items-center justify-center gap-2"
            >
              <Badge variant="secondary">
                {format(start, "HH:mm", {
                  in: tz(startTz),
                })}
              </Badge>
              <Separator className="max-w-2" />
              <Badge variant="secondary">
                {format(end, "HH:mm", {
                  in: tz(endTz),
                })}
              </Badge>
            </div>
          );
        })}
      {schedule.length >= max + 1 && (
        <Badge variant="secondary">+{schedule.length - max}</Badge>
      )}
    </>
  );
};

export default async function Section({ uid }: { uid: string | null }) {
  if (!uid) return <EmptySchedule />;
  const { data: schedule } = await getSchedule(uid);
  const hasSchedule = !!schedule;
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
      <div className="space-y-0">
        <div className="flex justify-between items-center">
          <button className="text-lg font-medium flex items-center gap-2">
            <span>Расписание</span>
            <ArrowRightIcon size={16} />
          </button>
          {hasSchedule && (
            <EditScheduleModal
              uid={uid}
              defaultSchedule={schedule}
              defaultDurations={durations}
            >
              <button className="placeholder:opacity-50 text-sm flex items-center gap-2 text-muted-foreground hover:text-foreground">
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
        <ul className="w-full grid grid-cols-2 gap-6">
          <li className="flex flex-row gap-3">
            <DayScheduleItem schedule={monday} label="Пн" />
          </li>
          <li className="flex flex-row gap-3">
            <DayScheduleItem schedule={tuesday} label="Вт" />
          </li>
          <li className="flex flex-row gap-3">
            <DayScheduleItem schedule={wednesday} label="Ср" />
          </li>
          <li className="flex flex-row gap-3">
            <DayScheduleItem schedule={thursday} label="Чт" />
          </li>
          <li className="flex flex-row gap-3">
            <DayScheduleItem schedule={friday} label="Пт" />
          </li>
          <li className="flex flex-row gap-3">
            <DayScheduleItem schedule={saturday} label="Сб" />
          </li>
          <li className="flex flex-row gap-3">
            <DayScheduleItem schedule={sunday} label="Вс" />
          </li>
        </ul>
      ) : (
        <div className="w-full h-fit p-8 border rounded-xl border-dashed flex flex-col items-center justify-center gap-4">
          <span className="text-sm text-muted-foreground">Нет расписания</span>
          <NewScheduleButton uid={uid} />
        </div>
      )}
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
                  <Badge variant="secondary">{format(parsed, "HH:mm")}</Badge>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export const SectionSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-0">
        <div className="flex w-full gap-4 items-center justify-between">
          <span className="text-lg font-medium block">Расписание</span>
          <Skeleton className="w-16 h-9 rounded-full" />
        </div>
        <span className="text-sm text-muted-foreground">
          Время когда другие пользователи могут запланировать с вами созвон.
        </span>
      </div>
    </div>
  );
};
