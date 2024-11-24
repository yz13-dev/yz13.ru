import { applyGrid } from "@/lib/grid";
import { Clock as ClockProps } from "@/types/widgets";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { cn } from "yz13/cn";
import { Props } from "./props";

dayjs.extend(timezone);
dayjs.extend(utc);

const Clock = (props: Props<ClockProps>) => {
  const { widget } = props
  const content = widget.content
  const local = dayjs()
  const timeZoned = local.tz(content.timeZone)
  return (
    <div
      style={applyGrid(widget.grid)}
      className={cn(
        "widget-wrapper",
        "clock-widget"
      )}
    >
      <span>{timeZoned.format("HH:mm")}</span>
    </div>
  )
}
export default Clock
