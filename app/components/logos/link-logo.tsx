import { cn } from "@yz13/ui/utils";

export default function ({
  className = "",
  type = "icon",
  imgClassName,
  size: provided,
}: {
  className?: string;
  imgClassName?: string;
  type?: "icon" | "full";
  size?: number;
}) {
  const lightSrc = type === "icon" ? "/link/light.png" : "/link/light-full.png";
  const darkSrc = type === "icon" ? "/link/dark.png" : "/link/dark-full.png";
  // const isSizeToSmall = provided && provided < 40;
  const defaultSize = 36;
  const size = provided ?? defaultSize;
  const width = type === "icon" ? size * 0.566666667 : size * 3;
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
