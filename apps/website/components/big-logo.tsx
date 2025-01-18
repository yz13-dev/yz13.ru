import Image from "next/image";
import { cn } from "yz13/cn";

const BigLogo = () => {
  return (
    <div className="w-full">
      <div className="w-full relative h-[125px] opacity-10">
        <Image
          className={cn("relative w-full", "light-mode-image")}
          fill
          draggable={false}
          src="/yz-full-light.svg"
          alt="YZ13-LOGO"
        />
        <Image
          className={cn("relative w-full", "dark-mode-image")}
          fill
          draggable={false}
          src="/yz-full-dark.svg"
          alt="YZ13-LOGO"
        />
      </div>
    </div>
  );
};

export default BigLogo;
