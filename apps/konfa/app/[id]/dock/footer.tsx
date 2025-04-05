"use client";

import { useEffect, useRef } from "react";
import { useDock } from "./wrapper";

type FooterProps = {
  children?: React.ReactNode;
};
export default function Footer({ children }: FooterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const setHeight = useDock((state) => state.setHeight);

  const handleResize = () => {
    const div = ref.current;
    if (!div) return;
    const height = div.clientHeight;
    setHeight(height);
  };
  useEffect(() => {
    const div = ref.current;
    if (!div) return;
    handleResize();
    div.addEventListener("resize", handleResize);
    return () => {
      div.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <footer
      ref={ref}
      className="w-full divide-y border-t gap-2 bg-background-secondary"
    >
      {children}
    </footer>
  );
}
