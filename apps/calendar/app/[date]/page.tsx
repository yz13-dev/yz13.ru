import User from "@/components/user";
import dayjs from "dayjs";
import { DotIcon, ListIcon, SearchIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { redirect } from "next/navigation";
import CalendarWidget from "./calendar";
import { CalendarProvider } from "./calendar-store";
import DateInfo from "./date-info";
import DayTimeline from "./day-timeline";

type PageProps = {
  params: Promise<{
    date: string;
  }>
};
const page = async ({ params }: PageProps) => {
  const { date: dateKey } = await params;
  const date = dayjs(dateKey, "YYYY-MM-DD").locale("ru");
  if (!date.isValid()) {
    const today = dayjs().locale("ru").format("YYYY-MM-DD");
    return redirect(`/calendar/${today}`);
  }
  return (
    <CalendarProvider date={dateKey}>
      <header className="w-full h-fit border-b bg-background-secondary px-4 py-2 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Button variant="outline">Сегодня</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline">
            <SearchIcon size={16} />
          </Button>
          {<User />}
        </div>
      </header>
      <div className="w-full p-4 flex flex-row gap-6 overflow-x-auto *:shrink-0">
        <div className="lg:w-80 w-dvw space-y-4">
          <DateInfo date={dateKey} />
          <div className="*:border space-y-4 *:bg-background-secondary *:rounded-lg">
            <CalendarWidget date={dateKey} />
            <div className="*:p-3 divide-y">
              <div className="flex items-center gap-2">
                <div className="size-6 flex items-center justify-center">
                  <ListIcon size={16} />
                </div>
                <span className="text-sm">Локальные</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-6 flex items-center justify-center">
                  <DotIcon size={24} />
                </div>
                <span className="text-sm">Личные</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-6 flex items-center justify-center">
                  <DotIcon size={24} />
                </div>
                <span className="text-sm">Работа</span>
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="text-sm text-foreground">
                  Нет внешних списков
                </span>
              </div>
            </div>
          </div>
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
