"use client"

import { cn } from "@yz13/ui/cn";
import { Skeleton } from "@yz13/ui/components/skeleton";
import { ImageIcon } from "lucide-react";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

type Props = {

} & ImageProps
export default function ({ className, src, ...props }: Props) {

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);


  return (
    <div className={cn("w-full border relative h-full flex items-center justify-center overflow-hidden", className)}>
      {
        loading && <Skeleton className="w-full h-full absolute inset-0" />
      }
      {
        error && <ImageIcon />
      }
      {
        !error &&
        <Image
          className={cn(loading ? "opacity-0" : "", "object-cover")}
          src={src}
          onError={() => {
            setError(true)
            setLoading(false)
          }}
          onLoad={() => {
            setLoading(false)
          }}
          {...props}
        />
      }
    </div>
  )
}
