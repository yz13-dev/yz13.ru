"use client";
import { useState } from "react";
import { Context } from "./terminal";
import { terminalApi } from "./terminal.api";

const TerminalInput = () => {
  const ctx = new Context()
  const [value, setValue] = useState<string>("")
  const handleCommand = (command: string) => {
    const parsed = terminalApi.parse(command)
    if (parsed) terminalApi.executePackageCommand(ctx, parsed.packageId, parsed.command, parsed.args)
  }
  return (
    <div className="w-full flex flex-col gap-1">
      <span className="text-sm text-foreground">user@yz13.ru</span>
      <textarea
        onKeyUp={e => {
          if (e.key === "Enter") {
            handleCommand(value)
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
        className="resize-none w-full bg-transparent outline-none" placeholder="Type command here"
      />
    </div>
  )
}

export default TerminalInput