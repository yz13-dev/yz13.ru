"use client"
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";




type Props = LinkProps & ComponentProps<"a"> & {
  track?: boolean
}

export default function TrackableLink({ href, track = false, className = "", children, ...props }: Props) {

  const pathname = usePathname();

  // if it's external link, then it's not trackable. Only interval links, example: /blog
  const isTrackable = !href.startsWith("http") && track === true

  const hasSearchParams = href.includes("?")

  const trackableHref = isTrackable ? `${href}${hasSearchParams ? "&" : "?"}from=${pathname}` : href

  return (
    <Link href={trackableHref} className={className} {...props}>{children}</Link>
  )
}
