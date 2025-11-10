"use client";
import { cn } from "@yz13/ui/cn";
import Image from "next/image";
import { ImagePreviewTrigger } from "./image-preview";



export default function ImagesGrid({ paths = [], className = "" }: { paths?: string[], className?: string }) {

  const isThree = paths.length === 3;
  const isTwo = paths.length === 2;
  const isSingle = paths.length === 1;

  return (
    <div className={cn(
      "w-full rounded-xl divide-x divide-y overflow-hidden grid",
      isThree && "grid-cols-3 grid-rows-2",
      isTwo && "grid-cols-2 grid-rows-1",
      isSingle && "grid-cols-1 grid-rows-1",
      className
    )}>
      {
        paths
          .map((src, index, arr) => {
            const isFirst = index === 0
            return (
              <div
                key={`${index}/${src}`}
                className={cn(
                  "size-full relative",
                  isThree && isFirst && "col-span-2 row-span-full"
                )}
              >
                <ImagePreviewTrigger src={src}>
                  <Image
                    className="size-full object-cover image-preview"
                    fill
                    src={src}
                    alt="carousel"
                  />
                </ImagePreviewTrigger>
              </div>
            )
          })
      }
    </div>
  )
}
