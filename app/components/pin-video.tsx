"use client";
import { randomFloat } from "@/app/utils/random";
import { cn } from "@yz13/ui/utils";
import { useDebounceEffect } from "ahooks";
import type { HTMLMotionProps } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState, type SyntheticEvent } from "react";





type Props = HTMLMotionProps<"video"> & {
  width?: number;
  height?: number;
}

export default function ({ src, className = "", onLoad, onError, width, height, layoutId, ...props }: Props) {

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState(false);
  const [blurred, setBlurred] = useState<boolean>(true);

  const handleOnCanPlay = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    console.log("loaded")
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    setHasError(true);
    onError?.(e);
  };

  const randomWait = useMemo(() => randomFloat(0, 2), []);

  useDebounceEffect(() => {
    if (isLoaded) setBlurred(false);
  }, [isLoaded], { wait: randomWait })
  return (
    <>
      <AnimatePresence>
        {
          blurred &&
          <motion.div
            className="z-10 absolute inset-0"
            initial={{ opacity: 1, backdropFilter: "blur(5px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: .5 }}
          />
        }
      </AnimatePresence>
      <motion.video
        muted={true}
        autoPlay={true}
        loop={true}
        //
        layoutId={layoutId}
        src={src}
        data-loading={!isLoaded}
        draggable={false}
        className={cn(
          "w-full rounded-sm transition-opacity block max-w-full",
          "data-[loading=false]:opacity-100 data-[loading=true]:opacity-0",
        )}
        width={width}
        height={width}
        onCanPlay={handleOnCanPlay}
        onError={handleError}
        {...props}
      />
    </>
  )
}
