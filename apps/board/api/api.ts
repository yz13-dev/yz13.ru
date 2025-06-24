import { getDpr, getOffset, getView, getZoom } from "@/state/state";
import { getStyle } from "./style";

export const zoom = (ctx: CanvasRenderingContext2D) => {
  const zoom = getZoom();
  const scale = zoom;
  ctx.scale(scale, scale);
  return ctx;
};

export const offset = (ctx: CanvasRenderingContext2D) => {
  const offset = getOffset();
  const translateX = offset.x;
  const translateY = offset.y;
  ctx.translate(translateX, translateY);
  return ctx;
};

export const getGridCoords = (x: number, y: number) => {
  const view = getView();
  const dpr = getDpr();

  const endX = Math.floor(Math.abs(view.x) + view.width) * dpr;
  const endY = Math.floor(Math.abs(view.y) + view.height) * dpr; // Fixed: using view.height

  const startX = -Math.floor(x) * dpr;
  const startY = -Math.floor(y) * dpr;

  return {
    x1: startX,
    y1: startY,
    x2: endX,
    y2: endY,
  };
};

export const grid = (ctx: CanvasRenderingContext2D) => {
  const currentZoom = getZoom();
  const dpr = getDpr();

  const GRID_SIZE = 100;
  const currentOffset = getOffset();

  const coords = getGridCoords(currentOffset.x, currentOffset.y);

  const startX = coords.x1
  const startY = coords.y1
  const endX = coords.x2
  const endY = coords.y2

  ctx.save();
  zoom(ctx)
  offset(ctx)

  ctx.strokeStyle = getStyle("--secondary");
  ctx.lineWidth = Math.max(1, dpr / currentZoom);

  ctx.beginPath();
  for (let x = startX; x <= endX; x += GRID_SIZE) {
    ctx.moveTo(x, startY);
    ctx.lineTo(x, endY);
  }
  for (let y = startY; y <= endY; y += GRID_SIZE) {
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
  }
  ctx.stroke();

  ctx.restore();
};
