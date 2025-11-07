"use client"

import { cn } from "@yz13/ui/cn"
import { motion } from "motion/react"
import * as React from "react"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  repeat?: number
  duration?: number
}

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  ({
    className,
    repeat = 4,
    duration = 30,
    ...props
  }, ref) => {

    return (
      <div
        ref={ref}
        className={cn(
          "relative size-full overflow-hidden py-16",
          className
        )}
        {...props}
      >
        <>
          <div className="absolute top-0 w-full h-[20%] bg-gradient-to-b from-background to-transparent z-10" />
          <div className="absolute bottom-0 w-full h-[20%] bg-gradient-to-t from-background to-transparent z-10" />
        </>
        <motion.div
          className="flex flex-col gap-6 items-center shrink-0"
          animate={{
            y: [0, "-50%"]
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            duration,
          }}
        >
          {Array.from({ length: repeat }, (_, i) => (
            <div key={i} className="flex flex-col gap-6 items-center">
              {props.children}
            </div>
          ))}
        </motion.div>
      </div>
    )
  }
)
