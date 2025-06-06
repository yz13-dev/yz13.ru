import { getDaysForMonthView } from "@/components/calendar/api";
import FullScreenCalendar from "@/components/calendar/fullscreen-calendar";
import { auth } from "@/lib/auth";
import { format, parse } from "date-fns";
import { getUserEvents } from "rest-api/calendar/events";

type PageProps = {
  params: Promise<{
    date: string;
  }>;
};

export default async function page({ params }: PageProps) {
  const { date: dateKey } = await params;
  const date = parse(dateKey, "yyyy-MM-dd", new Date());
  const month = getDaysForMonthView(dateKey);
  const user = await auth();
  const startDate = month.start;
  const endDate = month.end;
  const uid = user?.id;
  if (!uid)
    return (
      <FullScreenCalendar
        className="h-[calc(100dvh-61px)]"
        gridClassName="divide-y"
      />
    );
  const date_start = format(startDate, "yyyy-MM-dd");
  const date_end = format(endDate, "yyyy-MM-dd");
  const { data: events } = await getUserEvents(user.id, {
    start: date_start,
    end: date_end,
  });
  return (
    <FullScreenCalendar
      className="h-[calc(100dvh-61px)]"
      gridClassName="divide-y"
      data={events ?? []}
    />
  );
}
