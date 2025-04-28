import Footer from "@/components/footer";
import { Logo } from "@/components/logo";
import User, { UserSkeleton } from "@/components/user";
import { auth } from "@/lib/auth";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { Suspense } from "react";
import DayInfo from "./day-info";
import DaysRow from "./days-row";
import EventSection, { SectionSkeleton } from "./events/section";
import HeaderTime from "./header-time";
import MeetingSection from "./meetings/section";
import NewEventForm from "./new-event";
import ScheduleSection from "./schedule/section";

type PageProps = {
  searchParams: Promise<{
    date?: string;
  }>;
};
export default async function page({ searchParams }: PageProps) {
  const search = await searchParams;
  const date = search.date ?? "";
  const user = await auth();
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
          <ScheduleSection />
          <Separator />
          <MeetingSection disabled />
        </div>
        <div className="flex flex-col gap-2">
          <DaysRow defaultDate={date} className="h-fit shrink-0 marquee" />
          <Suspense fallback={<SectionSkeleton />}>
            {user && <EventSection uid={user?.id ?? null} date={date} />}
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
}
