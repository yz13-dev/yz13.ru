import Image from "next/image";
import { cn } from "yz13/cn";

type Size = {
  width: number;
  height: number;
};
const Logo = ({
  className = "",
  type = "only-icon",
  imgClassName,
  size,
}: {
  className?: string;
  imgClassName?: string;
  type?: "only-icon" | "full";
  size?: Size;
}) => {
  const lightSrc =
    type === "only-icon" ? "/yz-light.svg" : "/yz-full-light.svg";
  const darkSrc = type === "only-icon" ? "/yz-dark.svg" : "/yz-full-dark.svg";
  if (size) {
    return (
      <div className={cn("relative", className)}>
        <Image
          width={size.width}
          height={size.height}
          className={cn(imgClassName, "light-mode-image")}
          src={lightSrc}
          alt="YZ13-LOGO"
        />
        <Image
          className={cn(imgClassName, "dark-mode-image")}
          width={size.width}
          height={size.height}
          src={darkSrc}
          alt="YZ13-LOGO"
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
        alt="YZ13-LOGO"
      />
      <Image
        fill
        className={cn(imgClassName, "dark-mode-image")}
        src={darkSrc}
        alt="YZ13-LOGO"
      />
    </div>
  );
};
export { Logo };
