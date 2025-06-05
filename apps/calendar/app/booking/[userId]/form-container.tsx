"use client";
import { motion } from "motion/react";
import { cn } from "yz13/cn";

export default function FormContainer({ children, className }: { className?: string, children: React.ReactNode }) {
  return (
    <motion.div
      initial={{
        y: "100%",
        opacity: 0
      }}
      animate={{
        y: 0,
        opacity: 1
      }}
      exit={{
        y: "100%",
        opacity: 0
      }}
      transition={{
        duration: 0.75,
        ease: "circInOut",
      }}
      className={cn(
        "md:max-w-4xl max-w-2xl flex md:flex-row flex-col w-full mx-auto",
        "rounded-3xl border bg-card md:divide-y-0 divide-y md:divide-x divide-x-0 mt-12 overflow-hidden",
        className
      )}
    >
      {children}
    </motion.div>
  )
}
