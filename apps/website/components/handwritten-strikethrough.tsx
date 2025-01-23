"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "yz13/cn";

interface HandwrittenStrikethroughProps {
  children: React.ReactNode;
  duration?: number;
  lineWidth?: number;
  roughness?: number;
  className?: string;
  textClassName?: string;
  segments?: number;
}

const HandwrittenStrikethrough = ({
  children,
  duration = 2000,
  lineWidth = 2,
  roughness = 1.5,
  className = "",
  textClassName = "",
  segments = 20,
}: HandwrittenStrikethroughProps) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [path, setPath] = useState("");
  const [lineLength, setLineLength] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      const width = textRef.current.offsetWidth;
      const height = textRef.current.offsetHeight;
      const handwrittenPath = generateHandwrittenPath(
        width,
        height / 2,
        roughness,
      );
      setPath(handwrittenPath);
      setLineLength(calculatePathLength(handwrittenPath));
    }
  }, [children, roughness]);

  const generateHandwrittenPath = (
    width: number,
    y: number,
    roughness: number,
  ) => {
    const segmentWidth = width / segments;
    const amplitude = roughness * 10; // Базовая амплитуда
    const minHeight = amplitude * 0.1; // Минимальная высота зигзага: 2/3 от амплитуды
    const maxHeight = amplitude * 0.5; // Максимальная высота зигзага: 120% от амплитуды

    let path = `M 0 ${y} `;

    for (let i = 0; i <= segments; i++) {
      const x = i * segmentWidth;
      // Чередование направлений (вверх/вниз)
      const targetOffset = i % 2 === 0 ? maxHeight : -maxHeight;
      // Добавляем рандомизацию вокруг минимальной и максимальной границы
      const randomOffset =
        targetOffset + (Math.random() - 0.5) * (maxHeight - minHeight);
      const clampedOffset =
        Math.sign(randomOffset) * Math.max(Math.abs(randomOffset), minHeight);

      path += `L ${x} ${y + clampedOffset} `;
    }

    return path;
  };

  const calculatePathLength = (path: string) => {
    const dummyPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );
    dummyPath.setAttribute("d", path);
    return dummyPath.getTotalLength();
  };

  return (
    <span className="relative inline-block">
      <noindex ref={textRef} className={cn("select-none", textClassName)}>
        {children}
      </noindex>
      <svg
        className="absolute left-0 top-0 w-full h-full pointer-events-none"
        style={{ overflow: "visible" }}
      >
        <path
          d={path}
          fill="none"
          strokeWidth={lineWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={lineLength}
          strokeDashoffset={lineLength}
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

export { HandwrittenStrikethrough };
