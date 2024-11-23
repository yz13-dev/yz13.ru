import { applyGrid } from "@/lib/grid";
import { Clock as ClockProps } from "@/types/widgets";
import { cn } from "yz13/cn";
import { Props } from "./props";



const Clock = (props: Props<ClockProps>) => {
  const { widget } = props
  const content = widget.content
  return (
    <div
      style={applyGrid(widget.grid)}
      className={cn(
        "widget-wrapper",
        widget.id === "clock" ? "clock-widget" : "",
      )}
    >
      <span>13:08</span>
    </div>
  )
}
export default Clock