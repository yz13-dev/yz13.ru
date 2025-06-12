import { cdn } from "@/lib/cdn";
import Image from "next/image";
import type { Publication } from "@yz13/api/types/store";
import { cn } from "@yz13/ui/cn";

export default function AppLogo({
  publication,
  className = "",
}: {
  publication: Publication;
  className?: string;
}) {
  return (
    <>
      {publication.icon.type === "themed" && (
        <>
          <Image
            src={cdn(`/apps${publication.icon.dark}`)}
            className={cn("dark-mode-image", className)}
            alt=""
            fill
          />
          <Image
            src={cdn(`/apps${publication.icon.light}`)}
            className={cn("light-mode-image", className)}
            alt=""
            fill
          />
        </>
      )}
      {publication.icon.type === "simple" && (
        <Image
          src={cdn(`/apps${publication.icon.url}`)}
          className={className}
          alt=""
          fill
        />
      )}
    </>
  );
}
