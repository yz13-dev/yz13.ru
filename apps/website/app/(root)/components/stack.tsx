"use client";

import { cn } from "yz13/cn";

const list = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "NextJS",
  "TailwindCSS",
  "TypeScript",
  "Vite",
  "React Router",
  "Hono",
];

export default function Stack({ className = "" }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full flex items-start gap-2 flex-wrap *:bg-background",
        className,
      )}
    >
      {list.map((value, i) => {
        return (
          <span
            key={value + i}
            className="px-2 py-0.5 text-sm text-balance text-muted-foreground rounded-full border"
          >
            {value}
          </span>
        );
      })}
    </div>
  );
}
