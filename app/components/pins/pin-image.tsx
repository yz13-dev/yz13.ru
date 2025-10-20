"use client";
import { randomFloat } from "@/app/utils/random";
import { cn } from "@yz13/ui/utils";
import { useDebounceEffect } from "ahooks";
import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react";
import { useMemo, useState, type SyntheticEvent } from "react";

type Props = HTMLMotionProps<"img"> & {
  blurDataURL?: string | boolean
  width?: number
  height?: number
}

export default function ({ src, alt, className = "", blurDataURL, onLoad, onError, width, height, layoutId, ...props }: Props) {

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState(false);
  const [blurred, setBlurred] = useState<boolean>(true);
  const shouldShowBlur = useMemo(() => (!!blurDataURL) && !isLoaded, [blurDataURL, isLoaded]);

  const handleLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    onError?.(e);
  };

  const aspectRatio = useMemo(() => width && height ? width / height : 1, [width, height]);

  // Up to 1 second
  const randomWait = useMemo(() => randomFloat(0, 2), []);

  useDebounceEffect(() => {
    if (isLoaded && !shouldShowBlur) setBlurred(false);
  }, [isLoaded, shouldShowBlur], { wait: randomWait })
  return (
    <>
      {
        shouldShowBlur &&
        <motion.div
          className={cn(
            "size-full absolute inset-0 rounded-sm",
            typeof blurDataURL === "boolean" && "bg-secondary animate-pulse",
          )}
          style={{
            backgroundImage: typeof blurDataURL === "string" ? `url(${blurDataURL})` : undefined,
            backgroundSize: 'cover',
            aspectRatio,
            // height,
            // filter: 'blur(20px)',
            // transform: 'scale(1.1)'
          }}
        />
      }
      <AnimatePresence>
        {
          (!shouldShowBlur && blurred) &&
          <motion.div
            style={{
              aspectRatio,
            }}
            className="z-10 size-full absolute inset-0 rounded-sm"
            initial={{ opacity: 1, backdropFilter: "blur(5px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: .5 }}
          />
        }
      </AnimatePresence>
      <motion.img
        layoutId={layoutId}
        src={src}
        data-loading={!isLoaded}
        draggable={false}
        className={cn(
          "w-full rounded-sm transition-opacity block max-w-full",
          "data-[loading=false]:opacity-100 data-[loading=true]:opacity-0",
          className
        )}
        width={width}
        height={width}
        alt={alt}
        decoding="async"
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </>
  )
}
