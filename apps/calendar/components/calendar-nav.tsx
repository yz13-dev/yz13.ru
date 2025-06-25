import { Button } from "@yz13/ui/components/button";
import { ChevronLeftIcon, ChevronRightIcon, RotateCwIcon } from "lucide-react";


export default function () {
    return (
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
                <RotateCwIcon />
                <span className="lg:inline hidden">Сегодня</span>
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
    )
}
