import DayTimeline from "@/components/day-timeline";
import User from "@/components/user";
import dayjs from "dayjs";
import { SearchIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { redirect } from "next/navigation";
import { CalendarProvider } from "../calendar-store";
import CalendarWidget from "./calendar";

type PageProps = {
  params: {
    date: string;
  };
};
const page = async ({ params }: PageProps) => {
  const dateKey = params.date;
  const date = dayjs(dateKey, "YYYY-MM-DD").locale("ru");
  if (!date.isValid()) {
    const today = dayjs().locale("ru").format("YYYY-MM-DD");
    return redirect(`/calendar/${today}`);
  }
  return (
    <CalendarProvider date={dateKey}>
      <header className="w-full h-fit border-b bg-background-secondary p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex flex-col">
          <span className="text-lg text-foreground capitalize font-medium">
            {date.format("MMMM DD, YYYY")}
          </span>
          <span className="text-xs text-secondary capitalize">
            {date.format("dddd")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline">
            <SearchIcon size={16} />
          </Button>
          {<User />}
        </div>
      </header>
      <div className="w-full p-4 flex flex-row gap-6 overflow-x-auto *:shrink-0">
        <div className="*:border *:bg-background-secondary *:rounded-lg lg:w-80 w-dvw">
          <CalendarWidget date={dateKey} />
        </div>
        <DayTimeline
          dateRange={[date.date()]}
          timeRange={[0, 24]}
          className="lg:w-[600px] w-dvw"
          timeline={{
            showLabel: false,
          }}
        />
      </div>
    </CalendarProvider>
  );
};

export default page;
