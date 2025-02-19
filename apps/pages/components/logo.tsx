import Image from "next/image";
import logo_dark from "public/pages-dark.png";
import logo_full_dark from "public/pages-full-dark.png";
import logo_full_light from "public/pages-full-light.png";
import logo_light from "public/pages-light.png";
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
  const lightSrc = type === "only-icon" ? logo_light : logo_full_light;
  const darkSrc = type === "only-icon" ? logo_dark : logo_full_dark;
  const isSizeToSmall = size && size.width < 40;
  if (size) {
    return (
      <div className={cn("relative", className)}>
        <Image
          className={cn(imgClassName, "light-mode-image")}
          width={size.width}
          height={size.height}
          placeholder={isSizeToSmall ? undefined : "blur"}
          src={lightSrc}
          alt="YZ13"
        />
        <Image
          className={cn(imgClassName, "dark-mode-image")}
          width={size.width}
          height={size.height}
          placeholder={isSizeToSmall ? undefined : "blur"}
          src={darkSrc}
          alt="YZ13"
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
