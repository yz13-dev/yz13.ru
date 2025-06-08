import { format } from "date-fns";
import { Skeleton } from "mono/components/skeleton";
import { getUserEvents } from "rest-api/calendar/events";
import LiveEvents from "./live-events";

export function SectionSkeleton() {
  return (
    <>
      <div className="space-y-3">
        <Skeleton className="w-1/2 h-7" />
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
      </div>
      <div className="space-y-3">
        <Skeleton className="w-1/2 h-7" />
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
      </div>
    </>
  );
}

export default async function Section({
  uid,
  date = format(new Date(), "yyyy-MM-dd"),
}: {
  uid?: string;
  date?: string;
}) {
  // const today = new Date();
  // const targetDate = parse(date, "yyyy-MM-dd", new Date());
  // const diffInDay = differenceInDays(targetDate, today);
  if (!uid)
    return null;
  const { data } = await getUserEvents(uid, { date });
  const events = data ?? [];

  console.log(events)

  if (!events.length) return (
    <div className="w-full aspect-video flex items-center justify-center border rounded-md">
      <span className="text-sm text-muted-foreground">Нет событий</span>
    </div>
  )
  return (
    <div className="w-full space-y-3">
      <LiveEvents defaultEvents={events} uid={uid} date={date} />
    </div>
  );
}
