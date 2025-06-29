"use client"
import { randomNumberInRange } from "@/lib/random-id";
import { cn } from "@yz13/ui/cn";
import { motion } from "motion/react";
import Image from "next/image";
import variant1 from "public/background/variant-1.gif";
import variant10 from "public/background/variant-10.gif";
import variant11 from "public/background/variant-11.gif";
import variant12 from "public/background/variant-12.gif";
import variant13 from "public/background/variant-13.gif";
import variant14 from "public/background/variant-14.gif";
import variant15 from "public/background/variant-15.gif";
import variant16 from "public/background/variant-16.gif";
import variant17 from "public/background/variant-17.gif";
import variant18 from "public/background/variant-18.gif";
import variant19 from "public/background/variant-19.gif";
import variant2 from "public/background/variant-2.gif";
import variant20 from "public/background/variant-20.gif";
import variant21 from "public/background/variant-21.gif";
import variant3 from "public/background/variant-3.gif";
import variant4 from "public/background/variant-4.gif";
import variant5 from "public/background/variant-5.gif";
import variant6 from "public/background/variant-6.gif";
import variant7 from "public/background/variant-7.gif";
import variant8 from "public/background/variant-8.gif";
import variant9 from "public/background/variant-9.gif";
import { useEffect, useState } from "react";

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
  variant15,
  variant16,
  variant17,
  variant18,
  variant19,
  variant20,
  variant21,
];

export default function Background({
  className = "",
}: {
  className?: string;
}) {
  const randomBg = bgs[randomNumberInRange(0, bgs.length - 1)];
  const bgSrc = randomBg ?? variant1;

  const [loaded, setLoaded] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);


  useEffect(() => {
    setReady(true)
  }, [])
  if (!ready) return null
  return (
    <div className={cn("w-full h-dvh absolute top-0 z-[-1] left-0", className)}>
      <div
        className="w-full h-full relative"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 1 }}
          className={cn(
            "w-full h-full relative",
            "backdrop-grayscale bg-gradient-to-b from-background via-transparent to-background blur-2xl"
          )}
        >
          <Image
            onLoad={() => setLoaded(true)}
            className="object-cover opacity-40 w-full h-full invert dark:invert-0"
            src={bgSrc}
            fill
            alt="background"
          />
        </motion.div>
        {/* <div className="w-full h-full absolute inset-0" /> */}
      </div>
    </div>
  );
}
