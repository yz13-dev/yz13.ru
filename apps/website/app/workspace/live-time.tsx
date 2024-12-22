"use client"
import { useInterval } from "ahooks"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { cn } from "yz13/cn"
import useTimeStore, { getNewTime } from "./store/time.store"

dayjs.extend(timezone)
dayjs.extend(utc)

type LiveTimeProps = {
  className?: string
  showSeconds?: boolean
}

const LiveTime = ({ className = "", showSeconds = false }: LiveTimeProps) => {
  const { time, setTime } = useTimeStore()
  const getTime = () => {
    return getNewTime()
  }
  useInterval(() => {
    setTime(getTime())
  }, 1000)
  return (
    <span className={cn("text-sm", className)}>
      {
        showSeconds
          ? time.format("HH:mm:ss")
          : time.format("HH:mm")
      }
    </span>
  )
}

export default LiveTime
