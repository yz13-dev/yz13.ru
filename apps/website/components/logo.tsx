import Image from "next/image";
import { cn } from "yz13/cn";

const Logo = ({ className = "", type = "only-icon" }: { className?: string, type?: "only-icon" | "full" }) => {
  const lightSrc = type === "only-icon" ? "/yz-light.svg" : "/yz-full-light.svg";
  const darkSrc = type === "only-icon" ? "/yz-dark.svg" : "/yz-full-dark.svg";
  return (
    <div className={cn("relative", className)}>
      <Image fill className="light-mode-image" src={lightSrc} alt="YZ13-LOGO" />
      <Image fill className="dark-mode-image" src={darkSrc} alt="YZ13-LOGO" />
    </div>
  );
};
export { Logo };
