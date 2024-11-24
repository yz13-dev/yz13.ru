"use client"
import { applyGrid } from "@/lib/grid";
import { Clock as ClockProps } from "@/types/widgets";
import { useInterval } from "ahooks";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
import { cn } from "yz13/cn";
import { Props } from "./props";

dayjs.extend(timezone);
dayjs.extend(utc);

const Clock = (props: Props<ClockProps>) => {
  const { widget } = props
  const content = widget.content
  const updateTime = () => {
    const local = dayjs()
    const timeZoned = local.tz(content.timeZone)
    return timeZoned.format("HH:mm")
  }
  const [time, setTime] = useState(updateTime())
  useInterval(() => {
    setTime(updateTime())
  }, 1000)
  return (
    <div
      style={applyGrid(widget.grid)}
      className={cn(
        "widget-wrapper",
        "clock-widget"
      )}
    >
      <span>{time}</span>
    </div>
  )
}
export default Clock
