"use client";

import { cn } from "@yz13/ui/cn";
import { useEffect, useRef } from "react";

interface TextAreaPros
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onHeight?: (height: number) => void;
}
const AutoTextarea = ({
  value,
  className,
  onHeight,
  ...props
}: TextAreaPros) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = textarea.scrollHeight;
      if (onHeight) onHeight(newHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }, [value, ref, onHeight]);
  return (
    <textarea
      className={cn(
        "resize-none text-sm",
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-full border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      rows={1}
      ref={ref}
      value={value}
      {...props}
    />
  );
};

AutoTextarea.displayName = "AutoTextarea";

export default AutoTextarea;
