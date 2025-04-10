"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

export default function Stack() {
  return (
    <div className="w-full flex items-start gap-2 flex-wrap *:bg-background/60 *:backdrop-blur-sm">
      {list.map((value, i) => {
        return (
          <span
            key={value + i}
            className={cn(
              "px-4 py-1 text-sm text-balance text-foreground/60",
              "rounded-full border md:text-2xl text-lg",
            )}
          >
            {value}
          </span>
        );
      })}
    </div>
  );
}
