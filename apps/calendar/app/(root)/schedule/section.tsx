import { Badge } from "mono/components/badge";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { getSchedule } from "rest-api/calendar/schedule";
import { DaySchedule } from "rest-api/types/calendar";
import NewScheduleButton from "./new-schedule-button";

const EmptySchedule = () => {
  return (
    <div className="w-full h-fit p-8 border rounded-xl border-dashed flex flex-col items-center justify-center gap-4">
      <span className="text-sm text-muted-foreground">Нет расписания</span>
    </div>
  );
};

export default async function Section({ uid }: { uid: string | null }) {
  if (!uid) return <EmptySchedule />;
  const { data: schedule } = await getSchedule(uid);
  const hasSchedule = !!schedule;
  const monday = schedule?.monday ?? [];
  const tuesday = schedule?.tuesday ?? [];
  const wednesday = schedule?.wednesday ?? [];
  const thursday = schedule?.thursday ?? [];
  const friday = schedule?.friday ?? [];
  const saturday = schedule?.saturday ?? [];
  const sunday = schedule?.sunday ?? [];
  return (
    <div className="space-y-6">
      <div className="space-y-0">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium block">Расписание</span>
          {hasSchedule && <Button variant="secondary">Изменить</Button>}
        </div>
        <span className="text-sm text-muted-foreground">
          Время когда другие пользователи могут запланировать с вами созвон.
        </span>
      </div>
      {hasSchedule ? (
        <ul className="w-full grid md:grid-cols-3 grid-cols-2 gap-6">
          <li className="flex flex-row gap-3">
            <span className="text-sm text-muted-foreground">Пн:</span>
            {monday.slice(0, 1).map((item, index) => {
              const schedule = item as DaySchedule;
              const start = schedule.start;
              const end = schedule.end;
              return (
                <div
                  key={`monday-${index}`}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <Badge variant="secondary">{start.time}</Badge>
                  <Separator className="max-w-2" />
                  <Badge variant="secondary">{end.time}</Badge>
                </div>
              );
            })}
          </li>
          <li className="flex flex-row gap-3">
            <span className="text-sm text-muted-foreground">Вт:</span>
            {tuesday.slice(0, 1).map((item, index) => {
              const schedule = item as DaySchedule;
              const start = schedule.start;
              const end = schedule.end;
              return (
                <div
                  key={`monday-${index}`}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <Badge variant="secondary">{start.time}</Badge>
                  <Separator className="max-w-2" />
                  <Badge variant="secondary">{end.time}</Badge>
                </div>
              );
            })}
          </li>
          <li className="flex flex-row gap-3">
            <span className="text-sm text-muted-foreground">Ср:</span>
            {wednesday.slice(0, 1).map((item, index) => {
              const schedule = item as DaySchedule;
              const start = schedule.start;
              const end = schedule.end;
              return (
                <div
                  key={`monday-${index}`}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <Badge variant="secondary">{start.time}</Badge>
                  <Separator className="max-w-2" />
                  <Badge variant="secondary">{end.time}</Badge>
                </div>
              );
            })}
          </li>
          <li className="flex flex-row gap-3">
            <span className="text-sm text-muted-foreground">Чт:</span>
            {thursday.slice(0, 1).map((item, index) => {
              const schedule = item as DaySchedule;
              const start = schedule.start;
              const end = schedule.end;
              return (
                <div
                  key={`monday-${index}`}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <Badge variant="secondary">{start.time}</Badge>
                  <Separator className="max-w-2" />
                  <Badge variant="secondary">{end.time}</Badge>
                </div>
              );
            })}
          </li>
          <li className="flex flex-row gap-3">
            <span className="text-sm text-muted-foreground">Пт:</span>
            {friday.slice(0, 1).map((item, index) => {
              const schedule = item as DaySchedule;
              const start = schedule.start;
              const end = schedule.end;
              return (
                <div
                  key={`monday-${index}`}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <Badge variant="secondary">{start.time}</Badge>
                  <Separator className="max-w-2" />
                  <Badge variant="secondary">{end.time}</Badge>
                </div>
              );
            })}
          </li>
          <li className="flex flex-row gap-3">
            <span className="text-sm text-muted-foreground">Сб:</span>
            {saturday.slice(0, 1).map((item, index) => {
              const schedule = item as DaySchedule;
              const start = schedule.start;
              const end = schedule.end;
              return (
                <div
                  key={`monday-${index}`}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <Badge variant="secondary">{start.time}</Badge>
                  <Separator className="max-w-2" />
                  <Badge variant="secondary">{end.time}</Badge>
                </div>
              );
            })}
          </li>
          <li className="flex flex-row gap-3">
            <span className="text-sm text-muted-foreground">Вс:</span>
            {sunday.slice(0, 1).map((item, index) => {
              const schedule = item as DaySchedule;
              const start = schedule.start;
              const end = schedule.end;
              return (
                <div
                  key={`monday-${index}`}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <Badge variant="secondary">{start.time}</Badge>
                  <Separator className="max-w-2" />
                  <Badge variant="secondary">{end.time}</Badge>
                </div>
              );
            })}
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
