import { auth } from "@/lib/auth";
import { format } from "date-fns";
import { Skeleton } from "mono/components/skeleton";
import { getUserEvents } from "rest-api/calendar";
import { getSchedule } from "rest-api/calendar/schedule";
import Card from "./card";
import LinkButton from "./link-button";

const Empty = () => {
  return (
    <div className="w-full h-fit p-8 border rounded-xl border-dashed flex flex-col items-center justify-center gap-4">
      <span className="text-sm text-muted-foreground">
        Необходимо войти для просмотра
      </span>
    </div>
  );
};

export const SectionSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-0">
        <div className="flex w-full gap-4 items-center justify-between">
          <span className="font-medium block">Созвоны</span>
          <Skeleton className="w-16 h-7 rounded-full" />
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
  date = format(new Date(), "yyyy-MM-dd"),
}: {
  uid: string | null;
  date?: string;
  disabled?: boolean;
}) {
  if (!uid) return <Empty />;
  const { data: schedule } = await getSchedule(uid);
  const { data: appointments } = await getUserEvents(uid, {
    date,
    type: "appointment",
  });
  const hasSchedule = !!schedule;
  const hasMeetings = !!appointments?.length;
  const user = await auth();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <div className="space-y-6">
      <div className="space-y-0">
        <div className="flex w-full gap-4 items-center justify-between">
          <span className="font-medium block">Созвоны</span>
          {/* <Link
            href={`/meetings/${uid}`}
            className="text-lg font-medium flex items-center gap-2"
          >
            <span className="text-lg font-medium">Созвоны</span>
            <ArrowRightIcon size={16} />
          </Link> */}
          <LinkButton uid={user?.id} disabled={!hasSchedule} />
        </div>
        <span className="text-sm text-muted-foreground">
          Созвоны запланированные вами или другими пользователи.
        </span>
      </div>
      {hasMeetings ? (
        <ul className="w-full grid md:grid-cols-2 grid-cols-1 gap-6">
          {appointments.map((appointment) => {
            return <Card key={appointment.id} appointment={appointment} />;
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
