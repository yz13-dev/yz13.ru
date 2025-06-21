import { cn } from "@yz13/ui/cn";
import Image from "next/image";
import logo_dark from "public/news/logo-dark.png";
import logo_light from "public/news/logo-light.png";

export default function ({
  className = "",
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  const lightSrc = logo_light;
  const darkSrc = logo_dark;
  const width = size * 1.55;
  const height = size;
  const isSizeToSmall = height < 40;
  return (
    <div className={cn("relative", className)}>
      <Image
        className="light-mode-image"
        width={width}
        height={height}
        placeholder={isSizeToSmall ? undefined : "blur"}
        src={lightSrc}
        alt=""
      />
      <Image
        className="dark-mode-image"
        width={width}
        height={height}
        placeholder={isSizeToSmall ? undefined : "blur"}
        src={darkSrc}
        alt=""
      />
    </div>
  );
};
