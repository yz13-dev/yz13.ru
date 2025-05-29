import { getDpr, getOffset, getSize, getView, getZoom } from "./api";
import { getStyle } from "./style";

// Cache для стилей
const styleCache = new Map<string, string>();
const getCachedStyle = (property: string): string => {
  if (!styleCache.has(property)) {
    styleCache.set(property, getStyle(property));
  }
  return styleCache.get(property)!;
};

// Cache для вычислений сетки
let gridCache: {
  zoom: number;
  view: any;
  gridSize: number;
  lineWidth: number;
  bounds: { startX: number; startY: number; endX: number; endY: number };
} | null = null;

export const zoom = (ctx: CanvasRenderingContext2D) => {
  const zoom = getZoom();
  const dpr = getDpr();
  const scale = zoom * dpr;
  ctx.scale(scale, scale);
  return ctx;
};

export const offset = (ctx: CanvasRenderingContext2D) => {
  const offset = getOffset();
  const dpr = getDpr();
  const translateX = offset.x * dpr;
  const translateY = offset.y * dpr;
  ctx.translate(translateX, translateY);
  return ctx;
};
