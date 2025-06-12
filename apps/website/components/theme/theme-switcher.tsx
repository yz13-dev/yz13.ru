"use client";
import { cn } from "@yz13/ui/cn";
import { Skeleton } from "@yz13/ui/components/skeleton";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import useThemeStore, {
  getTheme,
  Theme,
  setTheme as updateTheme,
} from "./theme.store";

const ThemeSkeleton = () => {
  return <Skeleton className="w-[74px] h-6 rounded-full" />;
};

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>(getTheme());
  const handleTheme = (theme: "system" | "light" | "dark") => {
    updateTheme(theme);
  };
  useEffect(() => {
    useThemeStore.subscribe(({ theme }) => {
      setTheme(theme);
    });
  }, []);
  return (
    <div className="rounded-full flex items-center justify-between w-fit h-6 border">
      <button
        onClick={() => handleTheme("system")}
        className={cn(
          "size-6 rounded-full  flex items-center justify-center",
          theme === "system" ? "border-r text-foreground" : "text-foreground",
        )}
      >
        <MonitorIcon size={12} />
      </button>
      <button
        onClick={() => handleTheme("light")}
        className={cn(
          "size-6 rounded-full text-foreground flex items-center justify-center",
          theme === "light" ? "border text-foreground" : "text-foreground",
        )}
      >
        <SunIcon size={12} />
      </button>
      <button
        onClick={() => handleTheme("dark")}
        className={cn(
          "size-6 rounded-full text-foreground flex items-center justify-center",
          theme === "dark" ? "border-l text-foreground" : "text-foreground",
        )}
      >
        <MoonIcon size={12} />
      </button>
    </div>
  );
};

export { ThemeSkeleton };
export default ThemeSwitcher;
