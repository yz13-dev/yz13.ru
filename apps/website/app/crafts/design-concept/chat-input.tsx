"use client"

import AutoTextarea from "@/components/auto-textarea"
import { useState } from "react"


const ChatInput = () => {
  const [value, setValue] = useState<string>("")
  return (
    <AutoTextarea
      value={value}
      onChange={e => setValue(e.target.value)}
      className="w-full max-h-[50dvh]"
      placeholder="Enter text here"
    />
  )
}

export default ChatInput
