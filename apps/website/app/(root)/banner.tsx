import Image from "next/image";
import window_dark from "public/og/yz-dark-window.png";
import window_light from "public/og/yz-light-window.png";
import { cn } from "yz13/cn";

const Banner = ({
  className = "",
  imageClassName = "",
}: {
  className?: string;
  imageClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "relative w-full h-fit rounded-xl border-4 overflow-hidden",
        className,
      )}
      itemScope
      itemType="http://schema.org/ImageObject"
    >
      <span className="sr-only" itemProp="name">
        Нужен разработчик?
      </span>
      <Image
        fill
        draggable={false}
        placeholder="blur"
        itemProp="contentUrl"
        src={window_dark}
        className={cn("dark-mode-image w-full", imageClassName)}
        alt="Нужен разработчик?"
      />
      <Image
        fill
        draggable={false}
        placeholder="blur"
        itemProp="contentUrl"
        src={window_light}
        className={cn("light-mode-image w-full", imageClassName)}
        alt="Нужен разработчик?"
      />
    </div>
  );
};

export default Banner;
