import DayTimeline from "@/app/[date]/day-timeline";
import { differenceInDays, format, parse } from "date-fns";
import { Skeleton } from "mono/components/skeleton";
import { getUserEvents } from "rest-api/calendar";

export function SectionSkeleton() {
  return (
    <ul className="w-full h-fit space-y-3 py-3">
      {Array.from({ length: 9 }, (_, i) => {
        return (
          <li className="w-full" key={i}>
            <Skeleton className="w-full h-16" />
          </li>
        );
      })}
    </ul>
  );
}

export default async function Section({
  uid,
  date = format(new Date(), "yyyy-MM-dd"),
}: {
  uid?: string;
  date?: string;
}) {
  const today = new Date();
  const targetDate = parse(date, "yyyy-MM-dd", new Date());
  const diffInDay = differenceInDays(targetDate, today);
  if (!uid)
    return (
      <DayTimeline
        dateRange={[diffInDay]}
        timeRange={[0, 24]}
        className="w-full"
        timeline={{
          showLabel: false,
        }}
      />
    );
  const { data } = await getUserEvents(uid, { date });
  const events = data ?? [];
  return (
    <DayTimeline
      events={events}
      dateRange={[diffInDay]}
      timeRange={[0, 24]}
      className="w-full"
      timeline={{
        showLabel: false,
      }}
    />
  );
}
