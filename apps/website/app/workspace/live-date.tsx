"use client"
import { useInterval } from "ahooks"
import { cn } from "yz13/cn"
import useTimeStore, { getNewTime } from "./store/time.store"

const LiveDate = ({ className = "", format = "MMMM, DD YYYY" }: { className?: string, format?: string }) => {
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
        time.format(format)
      }
    </span>
  )
}

export default LiveDate