"use client";
import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";
import * as React from "react";

export interface SwipeButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  onSwipeComplete?: () => void;
  text?: string;
  className?: string;
  gap?: number;
  validationDuration?: number;
}

export function SwipeButton({
  onSwipeComplete,
  text = "Swipe to validate",
  className,
  gap = 3,
  validationDuration = 2000,
  ...props
}: SwipeButtonProps) {
  const [isSwiped, setIsSwiped] = React.useState(false);
  const [isValidated, setIsValidated] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [currentX, setCurrentX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (isValidated) {
      const timer = setTimeout(() => {
        setIsValidated(false);
        setIsSwiped(false);
        setCurrentX(0);
        setIsDragging(false);
      }, validationDuration);
      return () => clearTimeout(timer);
    }
  }, [isValidated, validationDuration]);

  const handleStart = (clientX: number) => {
    if (isValidated) return;
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!buttonRef.current || !isDragging || isValidated) return;

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const buttonWidth = buttonRef.current.offsetWidth;
    const maxSwipe = containerWidth - buttonWidth - gap * 2;

    let newX = clientX - startX;
    newX = Math.max(0, Math.min(newX, maxSwipe));

    setCurrentX(newX);
    setIsSwiped(newX >= maxSwipe - 10);
  };

  const handleEnd = () => {
    if (isValidated) return;

    if (isSwiped) {
      setIsValidated(true);
      setCurrentX(0);
      onSwipeComplete?.();
    } else {
      setCurrentX(0);
      setIsSwiped(false);
    }
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-[250px] h-10 rounded-lg overflow-hidden",
        "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm",
        "transition-colors duration-200",
        className
      )}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      role="button"
      aria-label="Swipe to validate"
      {...props}
    >
      <button
        ref={buttonRef}
        className={cn(
          "absolute rounded-md",
          "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900",
          "flex items-center justify-center",
          "cursor-grab active:cursor-grabbing",
          "shadow-sm transition-all duration-300",
          "hover:bg-neutral-800 dark:hover:bg-neutral-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900",
          "disabled:pointer-events-none",
          isValidated &&
          "w-[calc(100%-6px)] cursor-default bg-emerald-500 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-500 opacity-100"
        )}
        style={{
          width: isValidated ? `calc(100% - ${gap * 2}px)` : "36px",
          height: `calc(100% - ${gap * 2}px)`,
          left: isValidated ? `${gap}px` : `${gap}px`,
          top: `${gap}px`,
          transform: isValidated ? "none" : `translateX(${currentX}px)`,
          transition: isDragging ? "none" : "all 0.3s ease",
        }}
        aria-label={isValidated ? "Validated" : "Swipe to validate"}
        disabled={isValidated}
      >
        {isValidated ? (
          <Check className="w-4 h-4" aria-hidden="true" />
        ) : (
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        )}
      </button>
      <div className="w-full h-full flex items-center justify-center">
        <span
          style={{ "--swipe-button-text-width": "130px" } as React.CSSProperties}
          className={cn(
            "mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70 text-sm pointer-events-none",
            "animate-swipe-button-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--swipe-button-text-width)_100%] [transition:background-position_1s_cubic-bezier(.4,0,.2,1)_infinite] select-none",
            "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80"
          )}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
