"use client";

import { useEffect, useRef } from "react";

const Canvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  }, []);
  return (
    <>
      <canvas ref={ref} id="canvas" width="100" height="100"></canvas>
    </>
  );
};

export default Canvas;
