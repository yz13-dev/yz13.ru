"use client"

import { forwardRef, useEffect, useRef } from "react"
import { cn } from "yz13/cn"

interface TextAreaPros extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {

}
const AutoTextarea = ({ value, className, ...props }: TextAreaPros) => {
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    const textarea = ref.current
    if (textarea) {
      textarea.style.height = "auto"
      const newHeight = textarea.scrollHeight
      textarea.style.height = `${newHeight}px`
    }
  }, [value, ref])
  return (
    <textarea className={cn("resize-none text-sm p-1 outline-none", className)} ref={ref} {...props} />
  )
}

AutoTextarea.displayName = "AutoTextarea"

export default AutoTextarea
