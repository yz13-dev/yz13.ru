import { randomNumberInRange } from "@/lib/random-id";
import Image from "next/image";
import variant1 from "public/background/variant-1.gif";
import variant10 from "public/background/variant-10.gif";
import variant11 from "public/background/variant-11.gif";
import variant12 from "public/background/variant-12.gif";
import variant13 from "public/background/variant-13.gif";
import variant14 from "public/background/variant-14.gif";
import variant2 from "public/background/variant-2.gif";
import variant3 from "public/background/variant-3.gif";
import variant4 from "public/background/variant-4.gif";
import variant5 from "public/background/variant-5.gif";
import variant6 from "public/background/variant-6.gif";
import variant7 from "public/background/variant-7.gif";
import variant8 from "public/background/variant-8.gif";
import variant9 from "public/background/variant-9.gif";
import { cn } from "yz13/cn";

const bgs = [
  variant1,
  variant2,
  variant3,
  variant4,
  variant5,
  variant6,
  variant7,
  variant8,
  variant9,
  variant10,
  variant11,
  variant12,
  variant13,
  variant14,
];

export default async function Background({
  className = "",
}: {
  className?: string;
}) {
  const randomBg = bgs[randomNumberInRange(0, bgs.length - 1)];
  const bgSrc = randomBg ?? variant3;
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
