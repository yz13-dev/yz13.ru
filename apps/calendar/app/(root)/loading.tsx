import Footer from "@/components/footer";
import { Logo } from "@/components/logo";
import { UserSkeleton } from "@/components/user";
import { Skeleton } from "mono/components/skeleton";
import { SectionSkeleton } from "./schedule/section";
export default function oading() {
  return (
    <>
      <header className="md:px-[2.5%] px-[5%] md:pt-[2.5%] pt-[5%] calendar-container w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={{ width: 48, height: 48 }} type="only-icon" />
          <Skeleton className="h-9 w-36" />
        </div>
        <div className="flex items-center gap-2">
          <UserSkeleton />
        </div>
      </header>
      <div className="md:p-[2.5%] p-[5%] calendar-container w-full flex md:flex-row flex-col gap-6  min-h-dvh">
        <div className="flex flex-col gap-6 shrink-0 md:w-2/3 w-full">
          <div className="space-y-3">
            <Skeleton className="w-1/2 h-7" />
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-32" />
          </div>
          <div className="space-y-3">
            <Skeleton className="w-1/2 h-7" />
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-32" />
          </div>
        </div>
        <div className="space-y-6 md:w-1/3 w-full">
          <div className="flex flex-col gap-2">
            <span className="font-medium block">Бронирование</span>
            <Skeleton className="h-9 w-1/3" />
          </div>
          <SectionSkeleton />
        </div>
      </div>
      <Footer />
    </>
  );
}
