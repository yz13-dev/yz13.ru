import Footer from "@/components/footer";
import User, { UserSkeleton } from "@/components/user";
import { auth } from "@/lib/auth";
import { getBookingLink } from "@/lib/booking-link";
import { getDefaultCalendar } from "@yz13/api/calendar";
import { Button } from "@yz13/ui/components/button";
import { ArrowRightIcon, CalendarFoldIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Landing from "../(landing)/landing";
import Calendars from "./calendars";
import DateDisplay from "./date-display";
import DatePicker from "./date-picker";
import EventSection, { SectionSkeleton } from "./events/section";
import LinkButton from "./meetings/link-button";
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
  
  if (!user) return <Landing />;

  const { data: calendar } = await getDefaultCalendar(user.id);

  const calendarId = calendar?.id;
  const timezone = calendar?.timezone;

  return (
    <>
      {/* <header className="md:px-[2.5%] px-[5%] h-16 calendar-container w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={{ width: 48, height: 48 }} type="only-icon" />
        </div>
        <div className="flex items-center gap-2">
        </div>
        <div className="flex items-center gap-2">
          {showForm && user && (
            <NewEventForm uid={user?.id ?? null}>
              <Button size="icon" variant="outline">
                <PlusIcon size={16} />
              </Button>
            </NewEventForm>
          )}
        </div>
      </header> */}
      <div className="md:p-[2.5%] p-[5%] calendar-container w-full flex md:flex-row flex-col gap-6  min-h-dvh">
        <div className="space-y-6 md:w-1/4 shrink-0 w-full">
          <div className="flex items-center justify-between">
            <DateDisplay />
            <Suspense fallback={<UserSkeleton />}>
              <User />
            </Suspense>
          </div>
          <div className="rounded-lg overflow-hidden border bg-card">
            <DatePicker />
          </div>
          <Calendars userId={user.id} />
        </div>
        <div className="flex flex-col gap-6 shrink-0 md:w-2/4 w-full">
          <Suspense fallback={<SectionSkeleton />}>
            <EventSection uid={user?.id ?? undefined} date={date} />
          </Suspense>
        </div>
        <div className="space-y-6 md:w-1/4 shrink-0 w-full">
          {calendar && (
            <div className="flex flex-col gap-2">
              <span className="font-medium text-lg block">Календарь</span>
              <Button variant="secondary" className="w-fit">
                <CalendarFoldIcon />
                {calendar.name}
              </Button>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <span className="font-medium text-lg block">Бронирование</span>
            <div className="flex items-center gap-2">
              <LinkButton uid={user?.id} className="w-fit" />
              {user?.id && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href={getBookingLink(user.id)}>
                    Перейти
                    <ArrowRightIcon className="size-[14px]" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <ScheduleSection
            uid={user?.id ?? null}
            calendarId={calendarId}
            timezone={timezone ?? undefined}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
