"use client";
import { useEffect, useState } from "react";

const Background = ({ children }: { children?: React.ReactNode }) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      else {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div style={{ width, height }} className="absolute top-0 left-0">
        <div className="w-full h-full relative"></div>
      </div>
      {children}
    </>
  );
};

export default Background;
