'use client'
import { useInterval } from "ahooks"
import { useCallback, useEffect, useRef, useState } from "react"
import { useAnimationFrame } from "./useAnimationFrame"
import { cn } from "yz13/cn"
import { start } from "repl"

interface Props {
  className?: string
  pixelSize?: number
  numPixels?: number
  animationDuration?: number
  regenerationInterval?: number // Интервал обновления пикселей
}

type Pixel = {
  x: number
  y: number
  opacity: number
}

const BgCanvas: React.FC<Props> = ({
  className = "",
  pixelSize = 10,
  numPixels = 100,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [pixels, setPixels] = useState<Pixel[]>([])

  const regeneratePixels = useCallback(() => {
    if (!size.width || !size.height) return;
    setPixels(
      Array.from({ length: numPixels }, () => ({
        x: Math.random() * size.width,
        y: Math.random() * size.height,
        opacity: Math.random(),
      }))
    );
  }, [size, numPixels]);

  useEffect(() => {
    regeneratePixels();
  }, [size])
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, size.width, size.height);

    pixels.forEach((pixel) => {
      const PX_COLOR = getComputedStyle(canvas).getPropertyValue("--color-foreground")
      ctx.fillStyle = PX_COLOR;
      ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize);
    });
  }, [pixels, pixelSize, size]);

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={size.width}
      height={size.height}
      className={cn("fixed top-0 left-0 w-screen h-screen", className)}
    />
  )
}

export default BgCanvas

