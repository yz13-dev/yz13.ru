import { Logo } from "@/components/logo";
import User, { UserSkeleton } from "@/components/user";
import { auth } from "@/lib/auth";
import { differenceInDays, format, parse } from "date-fns";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { Suspense } from "react";
import DayTimeline from "../[date]/day-timeline";
import DayInfo from "./day-info";
import DaysRow from "./days-row";
import HeaderTime from "./header-time";
import MeetingSection, {
  SectionSkeleton as MeetingSectionSkeleton,
} from "./meetings/section";
import NewEventForm from "./new-event";
import ScheduleSection from "./schedule/section";

type PageProps = {
  searchParams: Promise<{
    date?: string;
  }>;
};
export default async function page({ searchParams }: PageProps) {
  const search = await searchParams;
  const date = search.date;
  const user = await auth();
  const defaultDate = format(new Date(), "yyyy-MM-dd");
  const today = new Date();
  const targetDate = parse(date ?? defaultDate, "yyyy-MM-dd", new Date());
  const diffInDay = differenceInDays(targetDate, today);
  return (
    <>
      <header className="md:px-[2.5%] px-[5%] md:pt-[2.5%] pt-[5%] calendar-container w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={{ width: 48, height: 48 }} type="only-icon" />
          <HeaderTime />
        </div>
        <div className="flex items-center gap-2">
          <NewEventForm uid={user?.id ?? null}>
            <Button size="icon" variant="outline">
              <PlusIcon size={16} />
            </Button>
          </NewEventForm>
          <Button size="icon" variant="outline">
            <SearchIcon size={16} />
          </Button>
          {/* <User /> */}
          <Suspense fallback={<UserSkeleton />}>
            <User />
          </Suspense>
        </div>
      </header>
      <div className="md:p-[2.5%] p-[5%] calendar-container w-full flex md:flex-row flex-col-reverse gap-6 md:*:w-1/2 *:w-full min-h-dvh">
        <div className="space-y-6">
          <DayInfo defaultDate={date} />
          <Separator />
          <ScheduleSection uid={user?.id ?? null} />
          <Separator />
          <Suspense fallback={<MeetingSectionSkeleton />}>
            <MeetingSection uid={user?.id ?? null} date={date} />
          </Suspense>
        </div>
        <div className="flex flex-col gap-6">
          <DaysRow defaultDate={date} className="h-fit shrink-0 marquee" />
          <DayTimeline
            dateRange={[diffInDay]}
            timeRange={[0, 24]}
            className="w-full"
            timeline={{
              showLabel: false,
            }}
          />
          {/* {false && (
            <Suspense fallback={<EventSectionSkeleton />}>
              {user && <EventSection uid={user?.id ?? null} date={date} />}
            </Suspense>
          )} */}
        </div>
      </div>
      {/* <Footer /> */}
      <div className="w-full h-[84px]" />
      <footer className="fixed backdrop-blur-sm bg-background/60 flex items-center max-w-dvw w-fit gap-1.5 bottom-0 left-0 right-0 mx-auto p-3 rounded-t-3xl">
        <Button>Обзор</Button>
        <Button variant="ghost">Поиск</Button>
        <Button variant="ghost">Календарь</Button>
      </footer>
    </>
  );
}
