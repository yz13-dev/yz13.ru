"use client";
import useTimeStore from "@/components/live/time.store";
import { useEffect, useRef, useState } from "react";
import { cn } from "yz13/cn";
import {
  getTerminalState,
  pushToHistory,
  TerminalState,
  useTerminalStore,
} from "./terminal";
import { executeCommand, terminal } from "./terminal.api";

type Props = {
  commandsOnStart?: string[];
};

const TerminalInput = ({ commandsOnStart = [] }: Props) => {
  const [value, setValue] = useState<string>("");
  const [height, setHeight] = useState<number>(20);
  const state = useTerminalStore((state) => state.terminalState);
  function handleInput(state: TerminalState, input: string) {
    const parsed = terminal.parseInput(input);
    executeCommand({ state, input: parsed, resolve: pushToHistory });
  }
  const time = useTimeStore((state) => state.time);
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (commandsOnStart.length !== 0) {
      commandsOnStart.forEach((cmd) => {
        const parsed = terminal.parseInput(cmd);
        const alreadyInHistory = state.history.some((rec) => {
          return rec.command === parsed.command;
        });
        if (!alreadyInHistory)
          executeCommand({ state, input: parsed, resolve: pushToHistory });
      });
    }
  }, []);
  useEffect(() => {
    const textarea = ref.current;
    if (textarea) {
      console.log("hit");
      textarea.style.height = "auto";

      const newHeight = textarea.scrollHeight;
      textarea.style.height = `${newHeight}px`;

      setHeight(newHeight);
    }
  }, [value, ref]);
  return (
    <div
      className={cn(
        "terminal-input transition-all",
        value.length < 200 ? "max-w-xl" : "max-w-4xl",
      )}
    >
      <div
        className={cn("flex items-center gap-2 *:font-mono terminal-prompt")}
      >
        <span className="text-sm text-secondary">{time.format("HH:mm")}</span>
        <span className="text-sm text-foreground">user@yz13.ru</span>
        <span className="text-sm text-foreground">~/</span>
      </div>

      <textarea
        ref={ref}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleInput(getTerminalState(), value);
            setValue("");
          }
        }}
        autoFocus
        value={value}
        onChange={(e) => {
          const noNewLines = e.target.value.replaceAll("\n", "");
          if (noNewLines.length === 0) {
            setValue("");
          } else setValue(noNewLines);
        }}
        style={{
          // @ts-expect-error
          "--textarea-height": `${height}px`,
        }}
        className="terminal-textarea"
        placeholder="Type command here"
      />
    </div>
  );
};

export default TerminalInput;
