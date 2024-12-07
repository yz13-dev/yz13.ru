"use client"
import { useState } from "react"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { useInterval } from "ahooks"
import { cn } from "yz13/cn"

dayjs.extend(timezone)
dayjs.extend(utc)

const LiveTime = ({ className = "" }: { className?: string }) => {
  const TZ = "Asia/Yekaterinburg"
  const getTime = () => {
    return dayjs().tz(TZ)
  }
  const [time, setTime] = useState(getTime())
  useInterval(() => {
    setTime(getTime())
  }, 1000)
  return <span className={cn("text-sm", className)}>{time.format("HH:mm:ss")}</span>
}

export default LiveTime
