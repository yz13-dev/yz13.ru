import Image from "next/image";
import { cn } from "yz13/cn";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={cn("relative", className)}>
      <Image fill className="light-mode-image" src="https://yzstatic.yz13.space/logo/yz-light.svg" alt="YZ13 LAB" />
      <Image fill className="dark-mode-image" src="https://yzstatic.yz13.space/logo/yz-dark.svg" alt="YZ13 LAB" />
    </div>
  );
};
export { Logo };
