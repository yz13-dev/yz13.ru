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

const OFFSET_Y = 80;
const INTERVAL = 2000;

export default function Stack() {
  const [activeIndex, setActiveIndex] = useState(Math.floor(list.length / 2));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        return (prev + 1) % list.length;
      });
    }, INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-start h-full w-full marquee-vertical">
      {list.map((value, i) => {
        const position = i - activeIndex;
        const isActive = activeIndex === i;

        const opacity = position === 0 ? 1 : 1 / Math.abs(position) + 0.2;

        return (
          <motion.span
            key={value + i}
            className={cn(
              "absolute left-0 top-1/2 text-5xl font-semibold",
              isActive ? "text-foreground" : "text-secondary",
            )}
            initial={{
              y: "-100%",
              opacity: 0,
            }}
            animate={{
              y: position * OFFSET_Y,
              opacity,
              zIndex: 100 - Math.abs(position),
            }}
            transition={{
              duration: 0.75,
              ease: "easeInOut",
            }}
          >
            {value}
          </motion.span>
        );
      })}
    </div>
  );
}
