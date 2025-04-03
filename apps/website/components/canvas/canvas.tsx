"use client";

import {
  PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from "react";
import {
  Coordinate,
  getZoom,
  setCtx,
  setCursor,
  setOffset,
  setSize,
  setZoom,
  Size,
} from "./api";
import { useMapApi } from "./api-provider";
import { canvasAPI } from "./canvas-api";
import useCanvasEventStore, { setEvent } from "./canvas.event";
import { onMouseDown, onMouseMove } from "./event-api";

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
  const { grid = false } = options || {};
  const ref = useRef<HTMLCanvasElement>(null);
  const offset = useMapApi((state) => state.offset);
  const size = useMapApi((state) => state.canvas);
  const dpr = useMapApi((state) => state.dpr);
  const ctx = useMapApi((state) => state.canvas.ctx);
  const [dragStart, setDragStart] = useState<Coordinate>({ x: 0, y: 0 });
  // wheel event time
  const [lastWheelEventTime, setLastWheelEventTime] = useState<number>(0);
  const event = useCanvasEventStore((state) => state.event);

  const render = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.save();
    ctx.clearRect(0, 0, width, height);

    const api = new canvasAPI(ctx);

    api.zoom();
    api.offset();
    if (grid) api.grid();

    if (onRender) onRender(ctx);

    ctx.restore();
  };

  const renderCanvas = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
    });
    if (!ctx) return;

    const width = size.width * dpr;
    const height = size.height * dpr;

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${size.width}px`;
    canvas.style.height = `${size.height}px`;

    render(ctx, width, height);

    setCtx(ctx);
    return ctx;
  }, [dpr, size, offset]);

  const handleDown = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!ctx) return;
    const { x, y } = onMouseDown(e);

    setEvent("move");
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  const handleMove = (e: PointerEvent<HTMLCanvasElement>) => {
    const { clientX, clientY } = e;
    const { x: startX, y: startY } = dragStart;
    const { x, y } = onMouseMove(e);
    setCursor({ x, y });

    const dx = clientX - startX;
    const dy = clientY - startY;

    if (dx === 0 && dy === 0) return;

    if (event === "move") {
      moveCanvas(dx, dy);
      setDragStart({ x: clientX, y: clientY });
    }
  };
  const moveCanvas = (dx: number, dy: number) => {
    const { x: offsetX, y: offsetY } = offset;
    const zoom = getZoom();

    const zoomFactor = 1 / (zoom * dpr);

    let newX = offsetX + dx * zoomFactor;
    let newY = offsetY + dy * zoomFactor;

    setOffset({ x: newX, y: newY });
  };
  const handleUp = (e: PointerEvent<HTMLCanvasElement>) => {
    if (event === "move") setEvent(null);
  };

  const onWheel = (e: WheelEvent<HTMLCanvasElement>) => {
    e.stopPropagation();
    const currentTime = e.timeStamp;
    const timeSinceLastEvent = currentTime - lastWheelEventTime;
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

  const handleWheelZoom = (
    deltaY: number,
    cursorX: number,
    cursorY: number,
  ) => {
    const ZOOM_STEP = 0.05;
    const delta = deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    const zoom = getZoom();
    const MIN_ZOOM = 0.1;
    const MAX_ZOOM = 10;
    const newZoom = Math.min(Math.max(zoom + delta, MIN_ZOOM), MAX_ZOOM);

    const zoomFactor = newZoom / zoom;

    const { x: offsetX, y: offsetY } = calculateOffset(
      cursorX,
      cursorY,
      zoomFactor,
    );

    setZoom(newZoom);
    moveCanvas(offsetX, offsetY);
  };

  const calculateOffset = (
    cursorX: number,
    cursorY: number,
    zoomFactor: number,
  ) => {
    const offsetDeltaX = (cursorX - offset.x) * (1 - zoomFactor);
    const offsetDeltaY = (cursorY - offset.y) * (1 - zoomFactor);
    return { x: offsetDeltaX, y: offsetDeltaY };
  };

  const handlePan = (e: React.WheelEvent<HTMLCanvasElement>) => {
    const dx = e.deltaX;
    const dy = e.deltaY;

    moveCanvas(dx, dy);
  };

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

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
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <canvas
        {...props}
        ref={ref}
        id="canvas"
        width="100"
        height="100"
        className={className}
        onPointerDown={handleDown}
        onPointerMove={handleMove}
        onPointerUp={handleUp}
        onWheel={onWheel}
      />
    </>
  );
};

export default Canvas;
