"use client";
import { useState } from "react";
import { cn } from "yz13/cn";
import useTimeStore from "../workspace/store/time.store";
import { getTerminalState, pushToHistory, TerminalState } from "./terminal";
import { executeCommand, terminal } from "./terminal.api";

const TerminalInput = () => {
  const [value, setValue] = useState<string>("")
  function handleInput(state: TerminalState, input: string) {
    const parsed = terminal.parseInput(input);
    executeCommand({ state, input: parsed, resolve: pushToHistory });
  }
  const time = useTimeStore(state => state.time)
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex items-center gap-2 *:font-mono">
        <span className="text-sm text-secondary">{time.format("HH:mm")}</span>
        <span className="text-sm text-foreground">user@yz13.ru</span>
        <span className="text-sm text-foreground">~/</span>
      </div>

      <textarea
        onKeyUp={e => {
          if (e.key === "Enter") {
            handleInput(getTerminalState(), value)
            setValue("")
          }
        }}
        autoFocus
        value={value}
        onChange={(e) => {
          const noNewLines = e.target.value.replaceAll("\n", "")
          if (noNewLines.length === 0) {
            setValue("")
          } else setValue(noNewLines)
        }}
        className={cn(
          "resize-none w-full bg-transparent outline-none",
          "text-sm font-mono"
        )}
        placeholder="Type command here"
      />
    </div>
  )
}

export default TerminalInput