"use client";
import dayjs from "dayjs";
import { CheckIcon, Loader2Icon, MoveDownLeftIcon, MoveUpRightIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "yz13/cn";
import { CommandOutput, CommandOutputEntry, useTerminalStore } from "./terminal";
import terminal from "./terminal.module.css";


const TerminalOutput = () => {
  const state = useTerminalStore(state => state.terminalState)
  return (
    <div className={terminal["terninal-output"]}>
      {
        state.history.map((item, index) => {
          console.log(item)
          return (
            <HistoryBlock key={`${item.timestamp}-${index}`} block={item} />
          )
        })
      }
    </div>
  )
}

const HistoryBlock = ({ block }: { block: CommandOutputEntry }) => {
  const start = dayjs(block.timestamp)
  const end = block.endTimestamp ? dayjs(block.endTimestamp) : null
  const date = start.format("HH:mm")
  const endDate = end ? end.diff(start, "milliseconds") : null
  const isCompleted = block.status === "completed"
  const isPending = block.status === "pending"
  return (
    <div className="flex w-full flex-col pt-2 border-t gap-1 *:font-mono overflow-x-auto">
      <div className="flex items-center gap-2">
        {
          isCompleted && <CheckIcon size={16} />
        }
        {
          isPending && <Loader2Icon size={16} className="animate-spin" />
        }
        <span className="text-xs text-secondary">{date}</span>
        <span className="text-xs text-secondary">({endDate !== null ? `${endDate}s` : ""})</span>
      </div>
      <span className="w-full text-sm text-foreground font-semibold">{block.command}</span>
      <HistoryBlockOutput block={block} output={block.output} />
    </div>
  )
}

const GreetingBlock = ({ message }: { message: string }) => {
  return (
    <div className="w-full h-auto">
      //////
    </div>
  )
}

const CodeBlock = ({ message }: { message: string }) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  return (
    <div className={cn(
      "w-full h-auto border bg-background-back rounded-lg divide-y transition-all",
      expanded ? "max-w-full" : "max-w-xs",
    )}>
      <div className="p-2 flex items-center justify-between">
        <span className="text-sm text-foreground font-semibold">fetch</span>
        <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1">
          <span className="text-xs">{expanded ? "Close" : "Open"}</span>
          {
            expanded
              ? <MoveDownLeftIcon size={16} />
              : <MoveUpRightIcon size={16} />
          }

        </button>
      </div>
      <pre className="p-2 overflow-x-auto">
        <code className={expanded ? "" : "line-clamp-1 break-all"}>
          {message}
        </code>
      </pre>
    </div>
  )
}

const HistoryBlockOutput = ({
  block,
  output
}: {
  block: CommandOutputEntry,
  output: CommandOutput[]
}) => {
  const isFetchCommand = block.command.startsWith("fetch")
  const isGreetingCommand = block.command.startsWith("greeting")
  return (
    <div className="w-full h-auto space-y-1">
      {
        output
          .map((item, index) => {
            if (isFetchCommand) return <CodeBlock key={item.message + "-" + index} message={item.message} />
            if (isGreetingCommand) return <GreetingBlock key={item.message + "-" + index} message={item.message} />
            return (
              <div key={item.message + "-" + index} className="flex items-center gap-1">
                {
                  item.type === "stdout" && <span className="text-sm text-foreground">{item.message}</span>
                }
                {
                  item.type === "stderr" && <span className="text-sm text-error">{item.message}</span>
                }
              </div>
            )
          })
      }
    </div>
  )
}

export default TerminalOutput