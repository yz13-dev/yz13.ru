"use client";

import { useEffect } from "react";
import useDockMenuStore, { setMenuId, setOverlay } from "./menus/menu.store";

const Overlay = () => {
  const useOverlay = useDockMenuStore((state) => state.withOverlay);
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.classList.add("no-scrollbar");
    }
    return () => {
      if (root) {
        root.classList.remove("no-scrollbar");
      }
    };
  }, []);
  if (!useOverlay) return null;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setMenuId(null);
        setOverlay(false);
      }}
      className="w-full h-dvh absolute inset-0 bg-background/50 backdrop-blur-sm"
    />
  );
};

export default Overlay;
