import Image from "next/image";
import yz_full_dark from "public/pages/pages-full-logo-dark.png";
import yz_full_light from "public/pages/pages-full-logo-light.png";
import yz_dark from "public/pages/pages-logo-dark.png";
import yz_light from "public/pages/pages-logo-light.png";
import { cn } from "yz13/cn";

type Size = {
  width: number;
  height: number;
};
const PagesLogo = ({
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
  const lightSrc = type === "only-icon" ? yz_light : yz_full_light;
  const darkSrc = type === "only-icon" ? yz_dark : yz_full_dark;
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
export { PagesLogo };
