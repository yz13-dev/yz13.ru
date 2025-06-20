import { cn } from "@yz13/ui/cn";
import Image from "next/image";
import logo_dark from "public/yzlab/logo-dark.png";
import logo_full_dark from "public/yzlab/logo-full-dark.png";
import logo_full_light from "public/yzlab/logo-full-light.png";
import logo_light from "public/yzlab/logo-light.png";

export default function ({
  className = "",
  type = "icon",
  imgClassName,
  size = 32,
}: {
  className?: string;
  imgClassName?: string;
  type?: "icon" | "full";
  size?: number;
}) {
  const lightSrc = type === "icon" ? logo_light : logo_full_light;
  const darkSrc = type === "icon" ? logo_dark : logo_full_dark;
  const isFull = type === "full";
  const width = isFull ? size * 6.5625 : size * 2;
  const height = size;
  const isSizeToSmall = height < 40;
  if (size) {
    return (
      <div className={cn("relative", className)}>
        <Image
          className={cn(imgClassName, "light-mode-image")}
          width={width}
          height={height}
          placeholder={isSizeToSmall ? undefined : "blur"}
          src={lightSrc}
          alt=""
        />
        <Image
          className={cn(imgClassName, "dark-mode-image")}
          width={width}
          height={height}
          placeholder={isSizeToSmall ? undefined : "blur"}
          src={darkSrc}
          alt=""
        />
      </div>
    );
  }
  return (
    <div className={cn("relative", className)}>
      <Image
        fill
        className={cn(imgClassName, "light-mode-image")}
        src={lightSrc}
        alt=""
      />
      <Image
        fill
        className={cn(imgClassName, "dark-mode-image")}
        src={darkSrc}
        alt=""
      />
    </div>
  );
};
