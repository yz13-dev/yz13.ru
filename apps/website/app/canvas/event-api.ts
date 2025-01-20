import { getOffset, getZoom } from "./canvas.store";

export const getMousePosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  return { x, y };
};

export const onDown = (
  ctx: CanvasRenderingContext2D,
  e: React.MouseEvent<HTMLCanvasElement>,
) => {
  const canvas = ctx.canvas;

  // 1. Координаты мыши, скорректированные с учётом масштаба
  const offset = getOffset();
  const zoom = getZoom();
  const rect = canvas.getBoundingClientRect();
  const mouse = getMousePosition(e);
  const x = (mouse.x - offset.x) / zoom;
  const y = (mouse.y - offset.y) / zoom;
  return { x, y, rect, event: e };
};

export const onMove = (
  ctx: CanvasRenderingContext2D,
  e: React.MouseEvent<HTMLCanvasElement>,
) => {
  const canvas = ctx.canvas;
  const offset = getOffset();
  const zoom = getZoom();
  const rect = canvas.getBoundingClientRect();
  const mouse = getMousePosition(e);
  const x = (mouse.x - offset.x) / zoom;
  const y = (mouse.y - offset.y) / zoom;
  return { x, y, rect, event: e };
};
