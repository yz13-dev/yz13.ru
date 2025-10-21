import { cn } from "@yz13/ui/utils";
import Image from "next/image";

export default function ({
  label,
  className = "",
  type = "icon",
  imgClassName,
  size = 32,
}: {
  label?: string;
  className?: string;
  imgClassName?: string;
  type?: "icon" | "full";
  size?: number;
}) {
  const lightSrc =
    type === "icon" ? "/yzlab/light.png" : "/yzlab/light-full.png";
  const darkSrc = type === "icon" ? "/yzlab/dark.png" : "/yzlab/dark-full.png";
  const isFull = type === "full";
  const width = isFull ? size * 6.5625 : size * 2;
  const height = size;
  const isSizeToSmall = height < 40;
  const Label = () => (
    <span className="text-xs text-foreground absolute -top-2 left-[105%]">
      {label}
    </span>
  );
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
        {label && <Label />}
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
      {label && <Label />}
    </div>
  );
}
