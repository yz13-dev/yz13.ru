"use client";
import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { cn } from "yz13/cn";

type UnderlineProps = {
  children?: ReactNode; // Содержимое текста
  className?: string;
  underlineHeight?: number; // Расстояние между текстом и линией подчеркивания
  lineWidth?: number;
  roughness?: number; // Хаотичность линии
  duration?: number;
};

const UnderlinedText: React.FC<UnderlineProps> = ({
  children,
  underlineHeight = 5, // Расстояние между текстом и линией
  lineWidth = 2, // Толщина линии
  roughness = 2, // Хаотичность подчеркивания
  duration = 1000,
  className = "",
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number>(0);

  // Рассчитываем ширину текста
  useLayoutEffect(() => {
    if (textRef.current) {
      setWidth(textRef.current.offsetWidth);
    }
  }, [children]);

  // Генерируем путь для подчеркивания
  const generateUnderlinePath = (width: number, roughness: number) => {
    const segments = 10;
    let path = `M 0 0 `;
    const segmentLength = width / segments;
    let prevY = 0;

    for (let i = 1; i <= segments; i++) {
      const x = i * segmentLength;
      const yVariation = (Math.random() - 0.5) * roughness * 2;
      const y = prevY + yVariation;
      prevY = y;

      // Добавляем контрольные точки для создания кривой Безье
      const cp1x =
        x - segmentLength * 0.5 + (Math.random() - 0.5) * segmentLength * 0.2;
      const cp1y = prevY + (Math.random() - 0.5) * roughness;
      const cp2x =
        x - segmentLength * 0.5 + (Math.random() - 0.5) * segmentLength * 0.2;
      const cp2y = y + (Math.random() - 0.5) * roughness;

      path += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y} `;
    }

    return path;
  };

  const path = generateUnderlinePath(width, roughness);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span ref={textRef} style={{ position: "relative", zIndex: 2 }}>
        {children}
      </span>
      <svg
        width={width}
        height={lineWidth * 4} // Высота SVG для подчеркивания
        className="pointer-events-none"
        style={{
          position: "absolute",
          bottom: -underlineHeight,
          left: 0,
          zIndex: 1,
          overflow: "visible",
        }}
      >
        <path
          d={path}
          strokeWidth={lineWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={width}
          strokeDashoffset={width}
          className={cn("stroke-foreground", className)}
          style={{
            animation: `drawHandwritten ${duration}ms ease-out forwards`,
          }}
        />
      </svg>
      <style jsx>{`
        @keyframes drawHandwritten {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </span>
  );
};

export default UnderlinedText;
