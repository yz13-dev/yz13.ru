import { getOffset, getZoom } from "./api";

export const fromCanvasCoords = (x: number, y: number) => {
  const zoom = getZoom();
  const offset = getOffset();
  const doc = document?.documentElement;
  const headerSize = Number.parseInt(
    getComputedStyle(doc).getPropertyValue("--map-editor-header"),
  );
  const sidebarSize = Number.parseInt(
    getComputedStyle(doc).getPropertyValue("--map-editor-sidebar"),
  );
  const top = headerSize;
  const left = sidebarSize;
  const correctedX = Math.round(x * zoom + left + offset.x);
  const correctedY = Math.round(y * zoom + top + offset.y);
  return { x: correctedX, y: correctedY };
};

export const toOverlayCoords = (x: number, y: number) => {
  const doc = document?.documentElement;
  const headerSize = Number.parseInt(
    getComputedStyle(doc).getPropertyValue("--map-editor-header"),
  );
  const sidebarSize = Number.parseInt(
    getComputedStyle(doc).getPropertyValue("--map-editor-sidebar"),
  );
  const top = headerSize;
  const left = sidebarSize;
  const correctedX = Math.round(x - left);
  const correctedY = Math.round(y - top);
  return { x: correctedX, y: correctedY };
};

export const toCanvasCoords = (x: number, y: number) => {
  const zoom = getZoom();
  const offset = getOffset();
  const top = 0;
  const left = 0;
  const correctedX = Math.round((x - left - offset.x) / zoom);
  const correctedY = Math.round((y - top - offset.y) / zoom);
  return { x: correctedX, y: correctedY };
};
