import { parse } from "date-fns";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircleIcon,
  SearchIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import ViewSelector from "./view-selector";

export default function Header({
  date,
  defaultView = "month",
}: {
  date: string;
  defaultView?: string;
}) {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  const day = parsedDate.getDate();
  return (
    <header className="flex sticky bg-background top-0 z-10 px-4 py-2 flex-row items-center md:justify-between md:space-y-0 lg:flex-none">
      <div className="flex flex-auto">
        <div className="flex items-center gap-2">
          <div className="size-11 flex items-center rounded-md border justify-center">
            <span className="text-2xl font-semibold">
              {day}
              {/* {format(today, "d", { locale, weekStartsOn: 1 })} */}
            </span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-foreground capitalize">
              {/* {format(firstDayCurrentMonth, "MMMM, yyyy", {
                locale,
                weekStartsOn: 1,
              })} */}
            </h2>
            <p className="text-xs text-foreground capitalize">
              {/* {format(firstDayCurrentMonth, "MMM d, yyyy", {
                locale,
                weekStartsOn: 1,
              })}{" "}
              -{" "}
              {format(endOfMonth(firstDayCurrentMonth), "MMM d, yyyy", {
                locale,
                weekStartsOn: 1,
              })} */}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-row md:gap-4">
        <Button variant="outline" size="icon" className="hidden lg:flex">
          <SearchIcon size={16} strokeWidth={2} aria-hidden="true" />
        </Button>

        <ViewSelector defaultView={defaultView} className="lg:w-fit w-full" />

        <div className="inline-flex w-full -space-x-px rounded-lg shadow-sm shadow-black/5 md:w-auto rtl:space-x-reverse">
          <Button
            // onClick={previousMonth}
            className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
            variant="outline"
            size="icon"
            aria-label="Navigate to previous month"
          >
            <ChevronLeftIcon size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
          <Button
            // onClick={goToToday}
            className="w-[calc(100%-36px-36px)] rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 md:w-auto"
            variant="outline"
          >
            Сегодня
          </Button>
          <Button
            // onClick={nextMonth}
            className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
            variant="outline"
            size="icon"
            aria-label="Navigate to next month"
          >
            <ChevronRightIcon size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </div>

        <Button className="w-fit gap-2">
          <PlusCircleIcon size={16} strokeWidth={2} aria-hidden="true" />
          <span className="lg:inline hidden">Добавить</span>
        </Button>
      </div>
    </header>
  );
}
