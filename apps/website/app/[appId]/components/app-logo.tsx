import { cdn } from "@/lib/cdn";
import type { GetV1Store200Item } from "@yz13/api/types";
import { cn } from "@yz13/ui/cn";
import Image from "next/image";

export default function AppLogo({
  publication,
  className = "",
}: {
  publication: GetV1Store200Item;
  className?: string;
}) {

  const icon = publication.icon as any;

  return (
    <>
      {icon.type === "themed" && (
        <>
          <Image
            src={cdn(`/apps${icon.dark}`)}
            className={cn("dark-mode-image", className)}
            alt=""
            fill
          />
          <Image
            src={cdn(`/apps${icon.light}`)}
            className={cn("light-mode-image", className)}
            alt=""
            fill
          />
        </>
      )}
      {icon.type === "simple" && (
        <Image
          src={cdn(`/apps${icon.url}`)}
          className={className}
          alt=""
          fill
        />
      )}
    </>
  );
}
