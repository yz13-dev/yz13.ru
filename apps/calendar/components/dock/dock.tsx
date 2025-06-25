import { Button } from "@yz13/ui/components/button";
import { Input } from "@yz13/ui/components/input";
import { ListIcon, PlusCircleIcon, SearchIcon } from "lucide-react";
import { Suspense } from "react";
import CalendarNav from "../calendar-nav";
import User, { UserSkeleton } from "../user";
import Nav from "./nav";
import Wrapper from "./wrapper";


export default function ({ className = "" }: { className?: string }) {
    return (
        <>
            <div className="h-[var(--dock-height)] w-full"></div>
            <Wrapper className={className}>
                <div className="flex flex-row items-center justify-between md:*:gap-2 *:gap-1 *:px-2 md:*:w-1/3 *:w-fit [&>div]:first:justify-start [&>div]:last:justify-end">
                    <div className="flex flex-row items-center">
                        <Nav />
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <Input className="w-full lg:block hidden" placeholder="Поиск" />
                        <Button variant="outline" size="icon" className="lg:hidden flex">
                            <SearchIcon size={16} strokeWidth={2} aria-hidden="true" />
                        </Button>
                        <Button variant="outline"><ListIcon /><span className="md:inline hidden">Списки</span></Button>
                    </div>
                    <div className="flex flex-row items-center">
                        <CalendarNav />
                        <Button className="w-fit gap-2">
                            <PlusCircleIcon size={16} strokeWidth={2} aria-hidden="true" />
                            <span className="lg:inline hidden">Добавить</span>
                        </Button>
                        <Suspense fallback={<UserSkeleton />}>
                            <User />
                        </Suspense>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}
