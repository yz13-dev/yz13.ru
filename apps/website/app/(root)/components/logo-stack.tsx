"use client";
import { ThemeImage } from "@/components/theme-image";
import { cn } from "@yz13/ui/cn";
import { cubicBezier, motion } from "motion/react";
import { useEffect, useState } from "react";

type IconStackItem = {
  url?: string
  theme?: {
    light: string
    dark: string
  }
}

export const stack: IconStackItem[] = [
  {
    theme: {
      light: "/logo/light.png",
      dark: "/logo/dark.png"
    }
  },
  {
    theme: {
      light: "/projects/yzlab/logo/light.png",
      dark: "/projects/yzlab/logo/dark.png"
    }
  },
  {
    theme: {
      light: "/projects/pins/logo/light.png",
      dark: "/projects/pins/logo/dark.png"
    }
  },
  {
    theme: {
      light: "/projects/news/logo/light.png",
      dark: "/projects/news/logo/dark.png"
    }
  },
  {
    theme: {
      light: "/projects/blog/logo/light.png",
      dark: "/projects/blog/logo/dark.png"
    }
  },
  {
    theme: {
      light: "/projects/link/logo/light.png",
      dark: "/projects/link/logo/dark.png"
    }
  },
]

const MAX_VISIBLE = 4;
const ROTATION_INTERVAL = 3000; // 3 секунды

type Props = {
  className?: string;
  orientation?: "horizontal" | "vertical"
  align?: "top" | "bottom" | "left" | "right"
  gap?: number
}
export default function LogoStack({
  className = "",
  orientation = "vertical",
  align = "top",
  gap = 24
}: Props) {
  const [startIndex, setStartIndex] = useState(0);

  // Получаем видимые иконки (максимум 4) с их индексами в исходном массиве
  const getVisibleIcons = () => {
    const visible: Array<{ item: IconStackItem; originalIndex: number; stackIndex: number }> = [];
    for (let i = 0; i < MAX_VISIBLE; i++) {
      const index = (startIndex + i) % stack.length;
      const item = stack[index];
      if (item) {
        visible.push({ item, originalIndex: index, stackIndex: i });
      }
    }
    return visible;
  };

  const visibleIcons = getVisibleIcons();

  // Автоматическая ротация
  useEffect(() => {
    if (stack.length <= MAX_VISIBLE) return; // Не нужно ротировать, если иконок меньше или равно 4

    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % stack.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const stackConfig = [
    { scale: 1, z: 0, zIndex: 10 },
    { scale: 0.85, z: -10, zIndex: -10 },
    { scale: 0.65, z: -30, zIndex: -20 },
    { scale: 0.425, z: -40, zIndex: -30 },
  ] as const;

  return (
    <div className={cn(
      "size-32 relative",
      className
    )}>
      {visibleIcons.map(({ item, originalIndex, stackIndex }) => {
        const config = stackConfig[stackIndex];
        if (!config) return null;

        const axis = gap * stackIndex;

        return (
          <motion.div
            key={`icon-${originalIndex}`}
            layout
            animate={{
              scale: config.scale,
              y: orientation === "vertical" ? align === "top" ? -axis : align === "bottom" ? axis : undefined : undefined,
              x: orientation === "horizontal" ? align === "left" ? -axis : align === "right" ? axis : undefined : undefined,
              z: config.z,
              opacity: 1,
            }}
            data-index={stackIndex}
            transition={{
              delayChildren: 0.5,
              type: "spring",
              duration: 0.75,
              ease: cubicBezier(0.5, 0.1, 0.1, 1),
              layout: { duration: 0.75 }
            }}
            style={{
              zIndex: config.zIndex,
            }}
            className={cn(
              "absolute size-32",
              "data-[index=0]:outline-6 data-[index=0]:border",
              "data-[index=1]:outline-4 data-[index=1]:border",
              "data-[index=2]:outline-2 data-[index=2]:border-2",
              "data-[index=3]:outline-2 data-[index=3]:border-[3px]",
              "outline-border/40 transition-colors",
              "rounded-3xl bg-card flex items-center justify-center"
            )}
          >
            <ThemeImage
              className="relative"
              srcDark={item.theme?.dark || "/logo/dark.png"}
              srcLight={item.theme?.light || "/logo/light.png"}
              width={96}
              height={96}
              alt="logo"
            />
          </motion.div>
        );
      })}
    </div>
  )
}
