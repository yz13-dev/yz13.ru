"use client";

import {
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  type WheelEvent,
} from "react";
import {
  type Coordinate,
  getZoom,
  setCtx,
  setCursor,
  setOffset,
  setSize,
  setZoom,
  type Size,
} from "../api/api";
import { useMapApi } from "../api/api-provider";
import { zoom as applyZoom, offset as applyOffset } from "../api/canvas-api";
import useCanvasEventStore, { setEvent } from "../api/canvas.event";
import { onMouseDown, onMouseMove } from "../api/event-api";

type CanvasOptions = {
  grid?: boolean;
  enableDirtyRectOptimization?: boolean;
  maxFPS?: number;
};

type CanvasProps = {
  className?: string;
  onRender?: (ctx: CanvasRenderingContext2D) => void;
  options?: CanvasOptions;
} & React.HTMLAttributes<HTMLCanvasElement>;

const Canvas = ({
  onRender,
  options,
  className = "",
  ...props
}: CanvasProps) => {
  const {
    grid = false,
    enableDirtyRectOptimization = true,
    maxFPS = 60,
  } = options || {};

  const ref = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const lastRenderTimeRef = useRef<number>(0);
  const isDirtyRef = useRef<boolean>(true);
  const lastStateRef = useRef<any>({});

  const offset = useMapApi((state) => state.offset);
  const size = useMapApi((state) => state.canvas);
  const zoom = useMapApi((state) => state.zoom);
  const dpr = useMapApi((state) => state.dpr);
  const ctx = useMapApi((state) => state.canvas.ctx);
  const event = useCanvasEventStore((state) => state.event);

  const [dragStart, setDragStart] = useState<Coordinate>({ x: 0, y: 0 });
  const [lastWheelEventTime, setLastWheelEventTime] = useState<number>(0);

  // Memoize frame interval
  const frameInterval = useMemo(() => 1000 / maxFPS, [maxFPS]);

  // Check if state has changed (dirty checking)
  const hasStateChanged = useCallback(() => {
    const currentState = { offset, size, zoom, dpr, grid };
    const hasChanged =
      JSON.stringify(currentState) !== JSON.stringify(lastStateRef.current);
    if (hasChanged) {
      lastStateRef.current = currentState;
    }
    return hasChanged;
  }, [offset, size, zoom, dpr, grid]);

  // Optimized render function with dirty rect optimization
  const render = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      forceFullRender = false,
    ) => {
      const now = performance.now();

      // Frame rate limiting
      if (now - lastRenderTimeRef.current < frameInterval && !forceFullRender) {
        return;
      }

      lastRenderTimeRef.current = now;

      // Only render if dirty or forced
      if (!isDirtyRef.current && !forceFullRender) {
        return;
      }

      ctx.save();

      // Use dirty rect optimization if enabled
      if (enableDirtyRectOptimization && !forceFullRender) {
        // Calculate dirty region based on movement
        // For simplicity, we'll clear the entire canvas for now
        // In a real implementation, you'd track specific dirty regions
        ctx.clearRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      // Apply transformations
      applyZoom(ctx);
      applyOffset(ctx);

      // Custom rendering
      if (onRender) {
        onRender(ctx);
      }

      ctx.restore();
      isDirtyRef.current = false;
    },
    [onRender, grid, zoom, enableDirtyRectOptimization, frameInterval],
  );

  // Debounced render function
  const scheduleRender = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const canvas = ref.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", {
        alpha: true,
        // Performance optimizations
        desynchronized: true,
        willReadFrequently: false,
      });
      if (!ctx) return;

      const width = size.width * dpr;
      const height = size.height * dpr;

      // Only resize canvas if dimensions changed
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${size.width}px`;
        canvas.style.height = `${size.height}px`;
        isDirtyRef.current = true;
      }

      render(ctx, width, height);
      setCtx(ctx);
    });
  }, [size, dpr, render]);

  // Mark as dirty when state changes
  useEffect(() => {
    if (hasStateChanged()) {
      isDirtyRef.current = true;
      scheduleRender();
    }
  }, [hasStateChanged, scheduleRender]);

  // Optimized event handlers with throttling
  const handleDown = useCallback(
    (e: PointerEvent<HTMLCanvasElement>) => {
      if (!ctx) return;

      // Capture pointer for better performance
      e.currentTarget.setPointerCapture(e.pointerId);

      const { x, y } = onMouseDown(e);
      setEvent("move");
      setDragStart({ x: e.clientX, y: e.clientY });
    },
    [ctx],
  );

  const handleMove = useCallback(
    (e: PointerEvent<HTMLCanvasElement>) => {
      const { clientX, clientY } = e;
      const { x: startX, y: startY } = dragStart;
      const { x, y } = onMouseMove(e);

      setCursor({ x, y });

      const dx = clientX - startX;
      const dy = clientY - startY;

      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return; // Micro-movement threshold

      if (event === "move") {
        moveCanvas(dx, dy);
        setDragStart({ x: clientX, y: clientY });
      }
    },
    [dragStart, event],
  );

  const moveCanvas = useCallback(
    (dx: number, dy: number) => {
      const { x: offsetX, y: offsetY } = offset;
      const currentZoom = getZoom();
      const zoomFactor = 1 / (currentZoom * dpr);

      const newX = offsetX + dx * zoomFactor;
      const newY = offsetY + dy * zoomFactor;

      setOffset({ x: newX, y: newY });
      isDirtyRef.current = true;
    },
    [offset, dpr],
  );

  const handleUp = useCallback(
    (e: PointerEvent<HTMLCanvasElement>) => {
      // Release pointer capture
      e.currentTarget.releasePointerCapture(e.pointerId);

      if (event === "move") {
        setEvent(null);
      }
    },
    [event],
  );

  const onWheel = (e: WheelEvent<HTMLCanvasElement>) => {
    e.stopPropagation();
    const currentTime = e.timeStamp;
    setLastWheelEventTime(currentTime);
    const TOUCHPAD_FACTOR = 100;
    // const isToFast = timeSinceLastEvent < 30;
    const isTouchpad =
      Math.abs(e.deltaY) < TOUCHPAD_FACTOR && e.deltaMode === 0;
    const isZooming = isTouchpad ? e.ctrlKey : true;
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const cursorX = e.clientX - canvasRect.left;
    const cursorY = e.clientY - canvasRect.top;
    if (isZooming) {
      handleWheelZoom(e.deltaY, cursorX, cursorY);
    } else {
      handlePan(e);
    }
  };

  const handleWheelZoom = useCallback(
    (deltaY: number, cursorX: number, cursorY: number) => {
      const ZOOM_STEP = 0.05;
      const delta = deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
      const currentZoom = getZoom();
      const MIN_ZOOM = 0.1;
      const MAX_ZOOM = 10;
      const newZoom = Math.min(
        Math.max(currentZoom + delta, MIN_ZOOM),
        MAX_ZOOM,
      );

      if (newZoom === currentZoom) return; // No change needed

      const zoomFactor = newZoom / currentZoom;
      const { x: offsetX, y: offsetY } = calculateOffset(
        cursorX,
        cursorY,
        zoomFactor,
      );

      setZoom(newZoom);
      moveCanvas(offsetX, offsetY);
    },
    [offset],
  );

  const calculateOffset = useCallback(
    (cursorX: number, cursorY: number, zoomFactor: number) => {
      const offsetDeltaX = (cursorX - offset.x) * (1 - zoomFactor);
      const offsetDeltaY = (cursorY - offset.y) * (1 - zoomFactor);
      return { x: offsetDeltaX, y: offsetDeltaY };
    },
    [offset],
  );

  const handlePan = useCallback(
    (e: React.WheelEvent<HTMLCanvasElement>) => {
      const dx = e.deltaX;
      const dy = e.deltaY;
      moveCanvas(dx, dy);
    },
    [moveCanvas],
  );

  // Optimized resize handler with debouncing
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        if (ref.current) {
          const canvas = ref.current;
          const parent = canvas.parentElement;
          if (parent) {
            const newSize: Size = {
              width: parent.clientWidth,
              height: parent.clientHeight,
            };
            setSize(newSize);
            isDirtyRef.current = true;
          }
        }
      }, 100); // Debounce resize events
    };

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      {...props}
      ref={ref}
      id="canvas"
      width={900}
      height={600}
      className={className}
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
      onWheel={onWheel}
      style={{
        ...props.style,
        touchAction: "none", // Prevent default touch behaviors
      }}
    />
  );
};

export default Canvas;
