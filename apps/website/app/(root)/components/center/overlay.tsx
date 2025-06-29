"use client"
import { motion } from "motion/react";
import { ReactNode, useEffect } from "react";
import { useCenterStore } from "./store";

export default function ({ children }: { children?: ReactNode }) {

  const switchOpen = useCenterStore(state => state.switchOpen)

  const lockScroll = () => {
    const body = document.body;
    body.classList.add("overflow-hidden");
  }
  const unlockScroll = () => {
    const body = document.body;
    body.classList.remove("overflow-hidden");
  }
  useEffect(() => {
    lockScroll()
    return () => unlockScroll()
  }, [])
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="inset-0 absolute backdrop-blur-sm bg-background/30 w-full h-dvh"
      onClick={e => {
        switchOpen()
      }}
    >
      <div
        className="max-w-screen w-2xl space-y-6 h-fit absolute top-0 right-0 py-6 *:px-6"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </motion.div>
  )
}
