"use client"
import { Button } from "@yz13/ui/button"
import { XIcon } from "@yz13/ui/icons"
import { Slot } from "@yz13/ui/slot"
import Image from "next/image"
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
      onClick={() => setSrc(src)}
    >
      {children}
    </Slot>
  )
}

export default function () {

  const src = useImagePreviewStore((state) => state.src)
  const setSrc = useImagePreviewStore((state) => state.setSrc)

  if (!src) return null;
  return (
    <div
      className="fixed inset-0 z-20 w-full h-dvh bg-background/40 backdrop-blur-md flex items-center justify-center"
      onClick={() => setSrc(null)}
    >
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-6 right-6"
        onClick={() => setSrc(null)}
      >
        <XIcon />
      </Button>
      <Image
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
        src={src}
        className="max-w-7xl size-fit !static !block object-contain"
        fill
        alt="image-preview"
      />
    </div>
  )
}
