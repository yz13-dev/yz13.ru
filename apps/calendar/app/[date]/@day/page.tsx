import { parse } from "date-fns";
import { CalendarProvider } from "../calendar-store";
import DayTimeline from "../day-timeline";

type PageProps = {
  params: Promise<{
    date: string;
  }>;
};
const page = async ({ params }: PageProps) => {
  const { date: dateKey } = await params;
  const date = parse(dateKey, "yyyy-MM-dd", new Date());
  return (
    <CalendarProvider date={dateKey}>
      <div className="w-full min-h-[calc(100%-61px)] p-4 flex flex-row gap-6 overflow-x-auto *:shrink-0">
        <DayTimeline
          dateRange={[date.getDate()]}
          timeRange={[0, 24]}
          className="w-full"
          timeline={{
            showLabel: false,
          }}
        />
      </div>
    </CalendarProvider>
  );
};

export default page;
