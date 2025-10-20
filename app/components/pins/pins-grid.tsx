"use client";
import type { Pin } from "@/app/hooks/use-grid";
import useGrid from "@/app/hooks/use-grid";
import { randomInt } from "@/app/utils/random";
import { cn } from "@yz13/ui/utils";
import { useEffect, useState } from "react";
import PinCard, { PinCardSkeleton } from "./pin-card";





export default function ({ pins, boardId }: { pins: Pin[], boardId?: string }) {
  const grid = useGrid(pins);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    if (typeof window !== "undefined") setLoading(false);

  }, [])
  if (loading) return null;
  return grid
    .map((column, index, arr) => {
      const width = (1 / arr.length) * 100;
      return (
        <div
          key={`column/${index}`}
          style={{ width: `${width}%` }}
          className="space-y-3"
        >
          {
            column
              .map(pin => {
                if (!pin.attachment) return null;
                return <PinCard key={pin.id} pin={pin} boardId={boardId} />
              })
          }
        </div>
      )
    })
}


export const PinsGridSkeleton = ({ animation = true }: { animation?: boolean }) => {
  const grid = useGrid();
  return grid
    .map((column, index, arr) => {
      const width = (1 / arr.length) * 100;
      const randomPins = Array.from({ length: 3 }).map((_, index) => index)
      return (
        <div
          key={`column/${index}`}
          style={{ width: `${width}%` }}
          className="space-y-3"
        >
          {
            randomPins
              .map(pin => {
                const random = randomInt(1, 2)
                if (random === 1) return <PinCardSkeleton
                  key={`column/${index}/${pin}`}
                  className={!animation ? "animate-none" : ""}
                />
                else return <PinCardSkeleton
                  key={`column/${index}/${pin}`}
                  className={cn("aspect-[9/16]", !animation ? "animate-none" : "")}
                />

              })
          }
        </div>
      )
    })
}
