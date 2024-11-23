import { applyGrid } from "@/lib/grid"
import { Calendar as CalendarProps } from "@/types/widgets"
import { Calendar as MonthCalendar } from "mono/components/calendar"
import { cn } from "yz13/cn"
import { Props } from "./props"


const Calendar = (props: Props<CalendarProps>) => {
  const { widget } = props
  const content = widget.content
  return (
    <div
      style={applyGrid(widget.grid)}
      className={cn(
        "widget-wrapper",
        "relative p-4 flex justify-between border rounded-2xl",
        "group"
      )}
    >
      <MonthCalendar className="h-full p-0 w-full *:w-full *:h-full" />
    </div>
  )
}
export default Calendar