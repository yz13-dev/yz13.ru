"use client";
import { GlobeIcon } from "@yz13/ui/icons";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";




export default function Favicon({ url, size = 24 }: { url: string, size?: number }) {

  const [hasError, setHasError] = useState<boolean>(false);
  const [favicon, setFavicon] = useState<string | null>(null);

  const getFavicon = (url: string) => {
    try {

      const parsed = new URL(url);
      const host = parsed.host;

      setFavicon(`https://twenty-icons.com/${host}`)

    } catch (error) {
      console.error(error)
      return null;
    }
  }

  useLayoutEffect(() => {
    getFavicon(url);
  }, [url])
  if (favicon && !hasError) return <Image
    src={favicon}
    className="shrink-0 rounded-full"
    width={size}
    height={size}
    alt="favicon"
    onError={() => setHasError(true)}
  />
  return <GlobeIcon size={size - 4} className="shrink-0" />
}
