import { Button } from "@yz13/ui/components/button";
import { parse } from "date-fns";
import {
    ArrowLeftIcon,
    PlusCircleIcon,
    SearchIcon
} from "lucide-react";
import Link from "next/link";
import NewEventForm from "../(root)/new-event";
import ViewSelector from "./view-selector";

export default function Header({
    uid,
    date,
    defaultView = "month",
}: {
    uid?: string;
    date: string;
    defaultView?: string;
}) {
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());
    const day = parsedDate.getDate();
    return (
        <header className="flex sticky bg-background top-0 z-10 px-4 py-2 flex-row items-center md:justify-between md:space-y-0 lg:flex-none">
            <div className="flex flex-auto">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/">
                            <ArrowLeftIcon size={16} />
                        </Link>
                    </Button>
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

                <NewEventForm uid={uid ?? null}>
                    <Button className="w-fit gap-2" disabled={!uid}>
                        <PlusCircleIcon size={16} strokeWidth={2} aria-hidden="true" />
                        <span className="lg:inline hidden">Добавить</span>
                    </Button>
                </NewEventForm>
            </div>
        </header>
    );
}
