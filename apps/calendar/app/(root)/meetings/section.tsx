import { auth } from "@/lib/auth";
import { addMinutes, format, parse, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { Separator } from "mono/components/separator";
import { Skeleton } from "mono/components/skeleton";
import { getAppointments } from "rest-api/calendar/appointments";
import { getSchedule } from "rest-api/calendar/schedule";
import LinkButton from "./link-button";

const Empty = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-0">
        <div className="flex w-full gap-4 items-center justify-between">
          <span className="text-lg font-medium block">Созвоны</span>
          <LinkButton disabled={true} />
        </div>
        <span className="text-sm text-muted-foreground">
          Созвоны запланированные вами или другими пользователи.
        </span>
      </div>
      <div className="w-full h-fit p-8 border rounded-xl border-dashed flex flex-col items-center justify-center gap-4">
        <span className="text-sm text-muted-foreground">
          Необходимо войти для просмотра
        </span>
      </div>
    </div>
  );
};

export const SectionSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-0">
        <div className="flex w-full gap-4 items-center justify-between">
          <span className="text-lg font-medium block">Созвоны</span>
          <Skeleton className="w-16 h-9 rounded-full" />
        </div>
        <span className="text-sm text-muted-foreground">
          Созвоны запланированные вами или другими пользователи.
        </span>
      </div>
    </div>
  );
};

export default async function Section({
  disabled = false,
  uid,
  date,
}: {
  uid: string | null;
  date?: string;
  disabled?: boolean;
}) {
  if (!uid) return <Empty />;
  const { data: schedule } = await getSchedule(uid);
  const { data: appointments } = await getAppointments(uid, date);
  const hasSchedule = !!schedule;
  const hasMeetings = !!appointments?.length;
  const user = await auth();
  return (
    <div className="space-y-6">
      <div className="space-y-0">
        <div className="flex w-full gap-4 items-center justify-between">
          <span className="text-lg font-medium block">Созвоны</span>
          <LinkButton uid={user?.id} disabled={!hasSchedule} />
        </div>
        <span className="text-sm text-muted-foreground">
          Созвоны запланированные вами или другими пользователи.
        </span>
      </div>
      {hasMeetings ? (
        <ul className="w-full grid md:grid-cols-2 grid-cols-1 gap-6">
          {appointments.map((appointment) => {
            const parsedTime = parseISO(appointment.date);
            const time = format(parsedTime, "HH:mm");
            const idSlice = appointment.id.slice(0, 6);
            const note = appointment.note ?? "";
            const parsedDuration = parse(
              appointment.duration,
              "HH:mm:ss",
              new Date(),
            );
            const date = format(parsedTime, "EEEE, d MMMM", {
              locale: ru,
            });
            const duration = format(parsedDuration, "HH:mm");
            const end = addMinutes(
              parsedTime,
              parsedDuration.getMinutes() + parsedDuration.getHours() * 60,
            );
            const endTime = format(end, "HH:mm");
            const email = appointment.email;
            return (
              <li key={appointment.id} className="flex flex-col gap-3 w-full">
                <div className="flex items-start w-full justify-between">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground">
                        {appointment.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        #{idSlice}
                      </span>
                    </div>
                    <span className="text-base text-foreground">{email}</span>
                    <span className="text-xs mt-1 capitalize text-muted-foreground">
                      {date}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-muted-foreground">
                      {time}-{endTime}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {duration}
                    </span>
                  </div>
                </div>
                {note && <Separator />}
                {note && (
                  <span className="text-sm text-muted-foreground">
                    Заметка: {note}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="w-full h-fit p-8 border rounded-xl border-dashed flex flex-col items-center justify-center gap-4">
          <span className="text-sm text-muted-foreground">Нет созвонов</span>
        </div>
      )}
    </div>
  );
}
