import Footer from "@/components/footer";
import { Logo } from "@/components/logo";
import { UserSkeleton } from "@/components/user";
import { Separator } from "mono/components/separator";
import { Skeleton } from "mono/components/skeleton";
import { SectionSkeleton as EventSectionSkeleton } from "./events/section";
import HeaderTime from "./header-time";
import { SectionSkeleton as MeetingSectionSkeleton } from "./meetings/section";
import ScheduleSection from "./schedule/section";
export default function oading() {
  return (
    <>
      <header className="md:px-[2.5%] px-[5%] md:pt-[2.5%] pt-[5%] calendar-container w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={{ width: 48, height: 48 }} type="only-icon" />
          <HeaderTime />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="rounded-full size-9" />
          <Skeleton className="rounded-full size-9" />
          <UserSkeleton />
        </div>
      </header>
      <div className="md:p-[2.5%] p-[5%] calendar-container w-full flex md:flex-row flex-col-reverse gap-6  min-h-dvh">
        <div className="space-y-6 md:w-1/3 w-full">
          <Skeleton className="w-32 h-[52px]" />
          <Separator />
          <ScheduleSection uid={null} />
          <Separator />
          <MeetingSectionSkeleton />
        </div>
        <div className="flex flex-col gap-2 md:w-2/3 w-full">
          <Skeleton className="w-full h-[60px]" />
          <EventSectionSkeleton />
        </div>
      </div>
      <Footer />
    </>
  );
}
