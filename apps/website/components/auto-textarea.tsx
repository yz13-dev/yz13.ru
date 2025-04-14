"use client";

import { useEffect, useRef } from "react";
import { cn } from "yz13/cn";

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
        "resize-none bg-transparent text-sm p-1 outline-none placeholder:text-foreground",
        className,
      )}
      ref={ref}
      value={value}
      {...props}
    />
  );
};

AutoTextarea.displayName = "AutoTextarea";

export default AutoTextarea;
