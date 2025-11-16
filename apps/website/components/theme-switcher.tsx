"use client";

import { Button } from "@yz13/ui/button";
import { cn } from "@yz13/ui/cn";
import { MonitorIcon, MoonStarIcon, SunIcon } from "@yz13/ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import type { JSX } from "react";
import { useEffect, useState } from "react";

function ThemeOption({
  icon,
  value,
  isActive,
  label,
  onClick,
}: {
  icon: JSX.Element;
  value: string;
  label: string;
  isActive?: boolean;
  onClick: (value: string) => void;
}) {
  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      className={cn(
        "relative flex h-8 gap-0 cursor-default items-center justify-center rounded-full transition-all [&_svg]:size-4",
      )}
      role="radio"
      aria-checked={isActive}
      aria-label={`Switch to ${value} theme`}
      onClick={() => onClick(value)}
    >
      {icon}
      <AnimatePresence>
        {
          isActive &&
          <motion.span
            initial={{ opacity: 0, width: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, width: "auto", filter: "blur(0)" }}
            exit={{ opacity: 0, width: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.3 }}
            className={cn("pl-2 shrink-0", !isActive && "hidden")}
          >
            {label}
          </motion.span>
        }
      </AnimatePresence>
    </Button>
  );
}

const THEME_OPTIONS = [
  {
    icon: <MonitorIcon />,
    value: "system",
    label: "Ситемная",
  },
  {
    icon: <SunIcon />,
    value: "light",
    label: "Светлая",
  },
  {
    icon: <MoonStarIcon />,
    value: "dark",
    label: "Темная",
  },
];

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="flex h-8 w-24" />;
  }

  return (
    <motion.div
      layout
      key={String(isMounted)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="inline-flex items-center overflow-hidden rounded-full border bg-background ring-1 ring-border"
      role="radiogroup"
    >
      {THEME_OPTIONS.map((option) => (
        <ThemeOption
          key={option.value}
          icon={option.icon}
          value={option.value}
          label={option.label}
          isActive={theme === option.value}
          onClick={setTheme}
        />
      ))}
    </motion.div>
  );
}

export { ThemeSwitcher };
