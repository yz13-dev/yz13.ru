"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "yz13/cn";

type ThemedImage = {
  light: string;
  dark: string;
};
type Props = {
  images?: ThemedImage[];
  className?: string;
};

export const GallerySkeleton = ({ className = "" }: { className?: string }) => {
  return <Skeleton className={cn("w-full h-full", className)} />;
};

export default function ({ className = "", images = [] }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [index, setIndex] = useState(0);
  const [imagesElements, setImagesElements] = useState<Element[]>([]);
  const [needShowScroll, setNeedShowScroll] = useState<boolean>(false);
  const [highlighted, setHighlighted] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const getImagesElements = () => {
    const container = ref.current;
    if (!container) return [];
    return Array.from(container.children).map((child) => child);
  };
  const isFirstIndex = index === 0;
  const isLastIndex = index === images.length - 1;
  const getNextIndex = () => {
    const nextIndex = index + 1;
    if (nextIndex >= images.length) return 0;
    else return nextIndex;
  };
  const getPrevIndex = () => {
    const prevIndex = index - 1;
    if (prevIndex < 0) return images.length - 1;
    else return prevIndex;
  };
  const handleScroll = (index: number) => {
    const images = imagesElements;
    if (!images.length) return;
    const targetImage = images[index];
    if (!targetImage) return;
    targetImage.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };
  const checkIfNeedScroll = () => {
    const images = getImagesElements();
    const sumOfWidths = images.reduce((acc, image) => {
      return acc + image.clientWidth;
    }, 0);
    const containerWidth = ref.current?.offsetWidth;
    if (!containerWidth) return setNeedShowScroll(false);
    return setNeedShowScroll(sumOfWidths > containerWidth);
  };

  useEffect(() => {
    const gallery = document.getElementById("screenshots-gallery");
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        checkIfNeedScroll();
      }
    });
    if (gallery) observer.observe(gallery);
    const parent = document.getElementById("panel-container");
    if (parent) observer.observe(parent);
    checkIfNeedScroll();
    // container?.addEventListener("resizere", checkIfNeedScroll);
    // return () => {
    //   container?.removeEventListener("resizere", checkIfNeedScroll);
    // };
  }, [imagesElements]);
  useEffect(() => {
    if (images.length !== 0) {
      const imagesElements = getImagesElements();
      setImagesElements(imagesElements);
    }
  }, [images]);
  return (
    <div
      className="min-h-80 relative flex items-center w-full"
      onPointerEnter={() => setHighlighted(true)}
      onPointerLeave={() => setHighlighted(false)}
    >
      {needShowScroll && !isFirstIndex && (
        <Button
          className="absolute z-10 -left-[calc(36px/2)]"
          variant="secondary"
          size="icon"
          onClick={() => {
            const newIndex = getPrevIndex();
            setIndex(newIndex);
            handleScroll(newIndex);
          }}
        >
          <ArrowLeftIcon size={16} />
        </Button>
      )}
      {needShowScroll && !isLastIndex && (
        <Button
          className="absolute z-10 -right-[calc(36px/2)]"
          variant="secondary"
          size="icon"
          onClick={() => {
            const newIndex = getNextIndex();
            setIndex(newIndex);
            handleScroll(newIndex);
          }}
        >
          <ArrowRightIcon size={16} />
        </Button>
      )}
      <div
        ref={ref}
        id="screenshots-gallery"
        className={cn(
          "h-fit flex items-center gap-4 overflow-x-auto",
          className,
        )}
      >
        {images.map((image, i) => {
          const joinedKey = `${image.light}-${image.dark}-${i}`;
          const dark = image.dark;
          const light = image.light;
          const selected = index === i;
          return (
            <div
              key={joinedKey}
              className={cn(
                "relative shrink-0 *:min-h-80 *:max-h-80 overflow-hidden rounded-xl border-2",
                needShowScroll &&
                  highlighted &&
                  selected &&
                  "border-foreground",
              )}
            >
              <Image
                src={light}
                className="light-mode-image !static"
                fill
                alt=""
              />
              <Image
                src={dark}
                className="dark-mode-image !static"
                fill
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
