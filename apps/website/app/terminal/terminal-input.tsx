"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "yz13/cn";
import useTimeStore from "../workspace/store/time.store";
import { getTerminalState, pushToHistory, TerminalState } from "./terminal";
import { executeCommand, terminal } from "./terminal.api";
import terminalCSS from "./terminal.module.css";

const TerminalInput = () => {
  const [value, setValue] = useState<string>("")
  const [height, setHeight] = useState<number>(20)
  function handleInput(state: TerminalState, input: string) {
    const parsed = terminal.parseInput(input);
    executeCommand({ state, input: parsed, resolve: pushToHistory });
  }
  const time = useTimeStore(state => state.time)
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    const textarea = ref.current;
    if (textarea) {
      console.log("hit")
      textarea.style.height = "auto";

      const newHeight = textarea.scrollHeight;
      textarea.style.height = `${newHeight}px`;

      setHeight(newHeight);
    }
  }, [value, ref]);
  return (
    <div className={cn(
      terminalCSS["terminal-input"],
      "transition-all",
      value.length < 200 ? "max-w-xl" : "max-w-4xl",
    )}>
      <div className={cn(
        "flex items-center gap-2 *:font-mono",
        terminalCSS["terminal-prompt"],
      )}>
        <span className="text-sm text-secondary">{time.format("HH:mm")}</span>
        <span className="text-sm text-foreground">user@yz13.ru</span>
        <span className="text-sm text-foreground">~/</span>
      </div>

      <textarea
        ref={ref}
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
        style={{
          // @ts-expect-error
          "--textarea-height": `${height}px`
        }}
        className={terminalCSS["terminal-textarea"]}
        placeholder="Type command here"
      />
    </div>
  )
}

export default TerminalInput