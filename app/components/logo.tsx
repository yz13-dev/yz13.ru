import { cn } from "@yz13/ui/utils";

const Logo = ({
  className = "",
  type = "icon",
  imgClassName,
  size: provided,
}: {
  className?: string;
  imgClassName?: string;
  type?: "icon" | "full";
  size?: number;
}) => {
  const lightSrc = type === "icon" ? "/logo/light.png" : "/logo/light-full.png";
  const darkSrc = type === "icon" ? "/logo/dark.png" : "/logo/dark-full.png";
  // const isSizeToSmall = provided && provided < 40;
  const defaultSize = 36;
  const size = provided ?? defaultSize;
  const width = type === "icon" ? size * 1.52 : size * 3.85483871;
  const height = size;
  if (size) {
    return (
      <div className={cn("relative", className)} data-type={type}>
        <img
          className={cn(imgClassName, "light-mode-image")}
          width={width}
          height={height}
          // placeholder={isSizeToSmall ? undefined : "blur"}
          src={lightSrc}
          alt="YZ13"
        />
        <img
          className={cn(imgClassName, "dark-mode-image")}
          width={width}
          height={height}
          // placeholder={isSizeToSmall ? undefined : "blur"}
          src={darkSrc}
          alt="YZ13"
        />
      </div>
    );
  }
  return (
    <div className={cn("relative", className)} data-type={type}>
      <img
        className={cn(imgClassName, "light-mode-image")}
        src={lightSrc}
        alt="YZ13-LOGO"
      />
      <img
        className={cn(imgClassName, "dark-mode-image")}
        src={darkSrc}
        alt="YZ13-LOGO"
      />
    </div>
  );
};
export { Logo };
