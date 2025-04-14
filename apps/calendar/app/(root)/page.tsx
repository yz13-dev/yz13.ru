import User, { UserSkeleton } from "@/components/user";
import { SearchIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Suspense } from "react";
import DayInfo from "./day-info";
import HeaderTime from "./header-time";

export default function page() {
  return (
    <>
      <header className="md:px-[2.5%] px-[5%] md:pt-[2.5%] pt-[5%] calendar-container w-full flex items-center justify-between">
        <HeaderTime />
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline">
            <SearchIcon size={16} />
          </Button>
          {/* <User /> */}
          <Suspense fallback={<UserSkeleton />}>
            <User />
          </Suspense>
        </div>
      </header>
      <div className="md:p-[2.5%] p-[5%] calendar-container w-full flex md:flex-row flex-col gap-2 md:*:w-1/2 *:w-full">
        <div className="flex flex-col gap-2">
          <DayInfo />
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full h-20 bg-neutral-200"></div>
          <div className="w-full h-full *:h-20 space-y-3 py-3">
            <div className="w-full rounded-lg bg-neutral-200"></div>
            <div className="w-full rounded-lg bg-neutral-200"></div>
            <div className="w-full rounded-lg bg-neutral-200"></div>
            <div className="w-full rounded-lg bg-neutral-200"></div>
          </div>
        </div>
      </div>
    </>
  );
}
