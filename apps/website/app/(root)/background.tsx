import { animatedBackground } from "@/const/flags";
import Image from "next/image";

export default async function Background() {
  const bgSrc = await animatedBackground();
  return (
    <div className="w-full h-dvh absolute top-0 z-[-1] left-0">
      <div className="w-full h-full relative">
        <Image
          className="object-cover w-full h-full invert dark:invert-0"
          src={bgSrc}
          fill
          alt="background"
        />
        <div className="w-full h-full absolute top-0 left-0 backdrop-grayscale bg-gradient-to-b from-background via-transparent to-background backdrop-blur-xl" />
      </div>
    </div>
  );
}
