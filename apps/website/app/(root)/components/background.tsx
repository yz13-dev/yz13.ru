import { animatedBackground } from "@/const/flags";
import Image from "next/image";
import { cn } from "yz13/cn";

export default async function Background({
  className = "",
}: {
  className?: string;
}) {
  const bgSrc = await animatedBackground();
  return (
    <div className={cn("w-full h-dvh absolute top-0 z-[-1] left-0", className)}>
      <div className="w-full h-full relative">
        <Image
          className="object-cover w-full h-full invert dark:invert-0"
          src={bgSrc}
          fill
          alt="background"
        />
        <div className="w-full h-full absolute top-0 left-0 backdrop-grayscale bg-gradient-to-b from-background via-transparent to-background backdrop-blur-2xl" />
      </div>
    </div>
  );
}
