"use client"

import { Button } from "@yz13/ui/components/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@yz13/ui/components/dropdown-menu"
import { CalendarRangeIcon, CheckIcon, CompassIcon } from "lucide-react"
import { useState } from "react"


export default function () {

  const [view, setView] = useState("day")

  return (
    <>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <CalendarRangeIcon />
              Расписание
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="*:justify-between">
            <DropdownMenuItem onClick={() => setView("day")}>
              <span>Расписание</span>
              {view === "day" && <CheckIcon />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setView("week")}>
              <span>Неделя</span>
              {view === "week" && <CheckIcon />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setView("month")}>
              <span>Месяц</span>
              {view === "month" && <CheckIcon />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setView("year")}>
              <span>Год</span>
              {view === "year" && <CheckIcon />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button variant="secondary"><CompassIcon /></Button>
    </>
  )
}
