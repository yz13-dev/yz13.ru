import Footer from "@/components/footer";
import { Logo } from "@/components/logo";
import User, { UserSkeleton } from "@/components/user";
import { auth } from "@/lib/auth";
import { showEventForm } from "@yz13/flags";
import { PlusIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import DatePicker from "./date-picker";
import EventSection from "./events/section";
import LinkButton from "./meetings/link-button";
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
  const showForm = await showEventForm();
  if (!user) return redirect("/login?continue=https://calendar.yz13.ru");
  return (
    <>
      <header className="md:px-[2.5%] px-[5%] md:pt-[2.5%] pt-[5%] calendar-container w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={{ width: 48, height: 48 }} type="only-icon" />
          <DatePicker />
        </div>
        <div className="flex items-center gap-2">
          {showForm && user && (
            <NewEventForm uid={user?.id ?? null}>
              <Button size="icon" variant="outline">
                <PlusIcon size={16} />
              </Button>
            </NewEventForm>
          )}
          <Suspense fallback={<UserSkeleton />}>
            <User />
          </Suspense>
        </div>
      </header>
      <div className="md:p-[2.5%] p-[5%] calendar-container w-full flex md:flex-row flex-col gap-6  min-h-dvh">
        <div className="flex flex-col gap-6 shrink-0 md:w-2/3 w-full">
          <EventSection uid={user?.id ?? undefined} date={date} />
        </div>
        <div className="space-y-6 md:w-1/3 shrink-0 w-full">
          <div className="flex flex-col gap-2">
            <span className="font-medium block">Ссылка на бронирование</span>
            <LinkButton uid={user?.id} className="w-fit" />
          </div>
          <ScheduleSection uid={user?.id ?? null} />
          {
            false &&
            <Suspense fallback={<MeetingSectionSkeleton />}>
              <MeetingSection uid={user?.id ?? null} date={date} />
            </Suspense>
          }
        </div>
      </div>
      <Footer />
    </>
  );
}
