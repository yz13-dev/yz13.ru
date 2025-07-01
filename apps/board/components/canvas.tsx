"use client";
import { offset as applyOffset, zoom as applyZoom } from "@/api/api";
import { onMouseDown, onMouseMove } from "@/api/event";
import { useMapState } from "@/state/provider";
import { Coordinate, getZoom, setCtx, setCursor, setOffset, setSize, setZoom, Size } from "@/state/state";
import {
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  type WheelEvent
} from "react";

type CanvasOptions = {
  grid?: boolean;
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
  } = options || {};

  const ref = useRef<HTMLCanvasElement>(null);
  const offset = useMapState((state) => state.offset);
  const size = useMapState((state) => state.canvas);
  const zoom = useMapState((state) => state.zoom);
  const dpr = useMapState((state) => state.dpr);
  const ctx = useMapState((state) => state.canvas.ctx);
  // const event = useCanvasEventStore((state) => state.event);
  const elements = useMapState((state) => state.elements);

  const [dragStart, setDragStart] = useState<Coordinate>({ x: 0, y: 0 });
  const [lastWheelEventTime, setLastWheelEventTime] = useState<number>(0);

  // Optimized render function with dirty rect optimization
  const render = useCallback(
    (
      ctx: CanvasRenderingContext2D,
    ) => {
      const start = performance.now();

      ctx.save();
      applyZoom(ctx);
      applyOffset(ctx);

      for (const element of elements) {
        const x = element.x;
        const y = element.y;
        const width = element.width;
        const height = element.height;
        const rotation = element.rotation;

        const radians = rotation * Math.PI / 180;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(radians);
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      ctx.restore()


      // Custom rendering
      if (onRender) {
        onRender(ctx);
      }

      const end = performance.now();
      const duration = end - start;
      console.log("Rendered in " + duration + "ms");
    },
    [onRender, grid, zoom, offset, elements],
  );

  // Debounced render function
  const scheduleRender = useCallback(() => {
    requestAnimationFrame(() => {
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
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${size.width}px`;
      canvas.style.height = `${size.height}px`;

      ctx.save();
      ctx.clearRect(0, 0, width, height);
      render(ctx);
      ctx.restore();
      setCtx(ctx);
    });
  }, [size, offset, dpr, render]);

  // Optimized event handlers with throttling
  const handleDown = useCallback(
    (e: PointerEvent<HTMLCanvasElement>) => {
      if (!ctx) return;

      // Capture pointer for better performance
      e.currentTarget.setPointerCapture(e.pointerId);

      const { x, y } = onMouseDown(e);
      // setEvent("move");
      setDragStart({ x: e.clientX, y: e.clientY });
    },
    [ctx],
  );

  const handleMove = useCallback(
    (e: PointerEvent<HTMLCanvasElement>) => {
      const { clientX, clientY } = e;
      const { x: startX, y: startY } = dragStart;
      const { x, y } = onMouseMove(e);

      console.log("cursor", x, y);

      setCursor({ x, y });

      const dx = (clientX - startX) * (zoom / dpr);
      const dy = (clientY - startY) * (zoom / dpr);

      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return; // Micro-movement threshold

      // if (event === "move") {
      moveCanvas(dx, dy);
      setDragStart({ x: clientX, y: clientY });
      // }
    },
    [dragStart, event, dpr],
  );

  const moveCanvas = useCallback(
    (dx: number, dy: number) => {
      const { x: offsetX, y: offsetY } = offset;
      const currentZoom = getZoom();
      const zoomFactor = 1 / (currentZoom * dpr);

      const newX = offsetX + dx * zoomFactor;
      const newY = offsetY + dy * zoomFactor;

      setOffset({ x: newX, y: newY });
    },
    [offset, dpr],
  );

  const handleUp = useCallback(
    (e: PointerEvent<HTMLCanvasElement>) => {
      // Release pointer capture
      e.currentTarget.releasePointerCapture(e.pointerId);

      // if (event === "move") {
      // setEvent(null);
      // }
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

  useEffect(() => {
    scheduleRender()
  }, [offset, size, zoom, dpr, grid]);

  const handlePan = useCallback(
    (e: React.WheelEvent<HTMLCanvasElement>) => {
      const dx = e.deltaX;
      const dy = e.deltaY;
      moveCanvas(dx, dy);
    },
    [moveCanvas],
  );

  // Optimized resize handler with debouncing
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const canvas = ref.current;
        const parent = canvas.parentElement;
        if (parent) {
          const newSize: Size = {
            width: parent.clientWidth,
            height: parent.clientHeight,
          };
          setSize(newSize);
        }
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
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
