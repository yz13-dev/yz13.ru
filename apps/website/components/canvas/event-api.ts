import { toCanvasCoords } from "../canvas/canvas.coordinates";
import { getDragStart } from "./drag-point.store";

export const getMousePosition = (e: React.PointerEvent<HTMLCanvasElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const dragPoint = getDragStart();
  const x = e.clientX - dragPoint.x; // rect.left;
  const y = e.clientY - dragPoint.y; // rect.top;
  return { x, y };
};

export const onMouseDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
  // const canvas = ctx.canvas;

  // 1. Координаты мыши, скорректированные с учётом масштаба
  // const offset = getOffset();
  // const zoom = getZoom();
  // const rect = canvas.getBoundingClientRect();
  // const mouse = getMousePosition(e);
  // console.log(mouse.x, mouse.y, offset.x, offset.y, zoom);
  const coords = toCanvasCoords(e.clientX, e.clientY);
  const x = coords.x; // (mouse.x - offset.x) / zoom;
  const y = coords.y; // (mouse.y - offset.y) / zoom;
  // console.log(e.clientX, e.clientY);
  // console.log(x, y);
  // console.log(toCanvasCoords(e.clientX, e.clientY));
  return { x, y, event: e };
};
export const onPointerMove = (e: PointerEvent) => {
  // const canvas = ctx.canvas;
  // const offset = getOffset();
  // const zoom = getZoom();
  // const rect = canvas.getBoundingClientRect();
  // const mouse = getMousePosition(e);
  const coords = toCanvasCoords(e.clientX, e.clientY);
  const x = coords.x; // (mouse.x - offset.x) / zoom;
  const y = coords.y; // (mouse.y - offset.y) / zoom;
  return { x, y, event: e };
};
export const onMouseMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
  // const canvas = ctx.canvas;
  // const offset = getOffset();
  // const zoom = getZoom();
  // const rect = canvas.getBoundingClientRect();
  // const mouse = getMousePosition(e);
  const coords = toCanvasCoords(e.clientX, e.clientY);
  const x = coords.x; // (mouse.x - offset.x) / zoom;
  const y = coords.y; // (mouse.y - offset.y) / zoom;
  return { x, y, event: e };
};
