"use client";

import dayjs from "dayjs";
import { CheckIcon } from "lucide-react";
import { useTerminalStore } from "./terminal";


const TerminalOutput = () => {
  const state = useTerminalStore(state => state.terminalState)
  return (
    <>
      {
        state.history.map((item, index) => {
          const start = dayjs(item.timestamp)
          const end = item.endTimestamp ? dayjs(item.endTimestamp) : null
          const date = start.format("HH:mm")
          const endDate = end ? end.diff(start, "milliseconds") : null
          const isCompleted = item.status === "completed"
          return (
            <div key={`${item.timestamp}-${index}`} className="flex w-full flex-col pt-2 border-t gap-1 *:font-mono overflow-x-auto">
              <div className="flex items-center gap-2">
                {
                  isCompleted && <CheckIcon size={16} />
                }
                <span className="text-xs text-secondary">{date}</span>
                <span className="text-xs text-secondary">({endDate !== null ? `${endDate}s` : ""})</span>
              </div>
              <span className="w-full text-sm text-foreground font-semibold">{item.command}</span>
              {
                item.output.map((output, index) => {
                  return (
                    <div key={`${item.timestamp}-${output.type}-${index}`} className="flex w-full flex-col gap-1">
                      {
                        output.type === "stdout" && <span className="text-sm text-foreground">{output.message}</span>
                      }
                      {
                        output.type === "stderr" && <span className="text-sm text-error">{output.message}</span>
                      }
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </>
  )
}

export default TerminalOutput