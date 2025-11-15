"use client"
import { Button } from "@yz13/ui/button"
import { XIcon } from "@yz13/ui/icons"
import { Kbd } from "@yz13/ui/kbd"
import { Slot } from "@yz13/ui/slot"
import { motion } from "motion/react"
import Image from "next/image"
import { startTransition, useEffect } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { create } from "zustand"

type State = {
  src: string | null
}
type Actions = {
  setSrc: (src: State["src"]) => void
}

export const useImagePreviewStore = create<State & Actions>()((set) => ({
  src: null,
  setSrc: (src) => set({ src }),
}))

export const ImagePreviewTrigger = ({ src, children }: { src: string, children?: React.ReactNode }) => {
  const setSrc = useImagePreviewStore((state) => state.setSrc)



  return (
    <Slot
      onClick={() => {
        startTransition(() => {
          setSrc(src)
        })
      }}
    >
      {children}
    </Slot>
  )
}

export default function ImagePreview() {

  const src = useImagePreviewStore((state) => state.src)
  const setSrc = useImagePreviewStore((state) => state.setSrc)

  useHotkeys("esc", () => setSrc(null), {
    enabled: !!src
  })

  const unlockScroll = () => {
    const doc = document.documentElement

    doc.classList.remove("overflow-hidden")
  }
  const lockScroll = () => {
    const doc = document.documentElement
    doc.classList.add("overflow-hidden")
  }

  useEffect(() => {
    if (src) lockScroll()
    else unlockScroll()
  }, [src])
  if (!src) return null
  return (
    <motion.div
      className="fixed inset-0 z-50 p-[10%] w-full h-dvh bg-black/60 backdrop-blur-md flex items-center justify-center"
      onClick={() => setSrc(null)}
    >
      <Button
        size="default"
        variant="secondary"
        className="absolute top-6 right-6 z-30"
        onClick={() => setSrc(null)}
      >
        <Kbd>Esc</Kbd>
        <XIcon />
      </Button>
      <Image
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
        fill
        src={src}
        className="size-fit rounded-2xl container mx-auto object-contain image-preview"
        alt="image-preview"
      />
    </motion.div>
  )
}
