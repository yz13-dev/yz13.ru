import { tz } from "@date-fns/tz";
import { format, parse } from "date-fns";
import { Badge } from "mono/components/badge";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
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
  return (
    <div className="space-y-6">
      <div className="space-y-0">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium block">Расписание</span>
          {hasSchedule && (
            <EditScheduleModal uid={uid} defaultSchedule={schedule}>
              <Button variant="secondary">Изменить</Button>
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
    </div>
  );
}
