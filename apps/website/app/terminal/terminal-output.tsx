"use client";

import dayjs from "dayjs";
import useOutputStore from "./output.store";


const TerminalOutput = () => {
  const output = useOutputStore((state) => state.output)
  return (
    <>
      {
        output.map((item, index) => {
          const date = dayjs(item.timestamp).format("HH:mm:ss")
          return (
            <div key={`${item.proccess}-${index}`} className="flex w-full flex-col gap-1">
              <span className="text-sm text-secondary">{date}</span>
              <span className="text-sm text-foreground">{item.trigger}</span>
              <span className="text-sm text-foreground">{item.data}</span>
            </div>
          )
        })
      }
    </>
  )
}

export default TerminalOutput