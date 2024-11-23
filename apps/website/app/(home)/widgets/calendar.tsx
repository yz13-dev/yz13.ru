import { applyGrid } from "@/lib/grid"
import { Calendar as CalendarProps } from "@/types/widgets"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "mono/components/button"
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
        "relative p-4 space-y-2 border rounded-2xl",
        "group"
      )}
    >
      <div className="flex items-center justify-between">
        <Button className="size-7" size="icon" variant="outline"><ChevronLeftIcon size={16} /></Button>
        <span className="text-sm text-center">November</span>
        <Button className="size-7" size="icon" variant="outline"><ChevronRightIcon size={16} /></Button>
      </div>
      <div className="w-full h-[calc(100%-1.75rem-0.5rem)]">

      </div>
    </div>
  )
}
export default Calendar