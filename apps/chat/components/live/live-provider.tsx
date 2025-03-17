"use client"
import { useInterval } from "ahooks";
import { getNewTime, setTime } from "./time.store";

const LiveTimeProvider = ({ children }: { children?: React.ReactNode }) => {
  useInterval(() => {
    setTime(getNewTime())
  }, 1000)
  return <>{children}</>
}

export default LiveTimeProvider
