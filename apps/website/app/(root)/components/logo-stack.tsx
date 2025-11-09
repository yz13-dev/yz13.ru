"use client";
import { ThemeImage } from "@/components/theme-image";
import { cn } from "@yz13/ui/cn";
import { motion } from "motion/react";
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

export default function LogoStack() {
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
    { scale: 0.9, z: -10, zIndex: -10 },
    { scale: 0.75, z: -30, zIndex: -20 },
    { scale: 0.55, z: -40, zIndex: -30 },
  ] as const;

  return (
    <div className="size-32 mx-auto relative">
      {visibleIcons.map(({ item, originalIndex, stackIndex }) => {
        const config = stackConfig[stackIndex];
        if (!config) return null;

        const y = stackIndex * 24

        return (
          <motion.div
            key={`icon-${originalIndex}`}
            layout
            animate={{
              scale: config.scale,
              y: -y,
              z: config.z,
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              layout: { duration: 0.4 }
            }}
            style={{
              zIndex: config.zIndex,
            }}
            className={cn(
              "absolute size-32 border",
              stackIndex === 3 ? "border-2" : "",
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
