import { Clock as ClockProps } from "@/types/widgets";
import { cn } from "yz13/cn";
import { Props } from "./props";



const Clock = (props: Props<ClockProps>) => {
  const { widget } = props
  const content = widget.content
  return (
    <div
      style={{
        // @ts-expect-error
        "--column-start": `${widget.grid.column.start}`,
        "--column-end": `${widget.grid.column.end}`,
        "--row-start": `${widget.grid.row.start}`,
        "--row-end": `${widget.grid.row.end}`,
      }}
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