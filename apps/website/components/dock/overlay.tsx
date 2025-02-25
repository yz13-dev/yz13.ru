"use client";

import { useEffect } from "react";
import { setMenuId, setOverlay } from "./menus/menu.store";

const Overlay = () => {
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
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setMenuId(null);
        setOverlay(false);
      }}
      className="w-full h-dvh absolute inset-0 bg-background/50 backdrop-blur-sm backdrop-blur-sm"
    />
  );
};

export default Overlay;
