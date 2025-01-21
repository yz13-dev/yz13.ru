import { getDpr, getOffset, getSize, getZoom } from "./canvas.store";

export class canvasAPI {
  ctx: CanvasRenderingContext2D | null = null;
  constructor(ctx: CanvasRenderingContext2D | null) {
    if (ctx) this.ctx = ctx;
  }

  zoom() {
    if (this.ctx) {
      const zoom = getZoom();
      const dpr = getDpr();
      this.ctx.scale(zoom * dpr, zoom * dpr);
      return this.ctx;
    }
  }
  offset() {
    if (this.ctx) {
      const offset = getOffset();
      const dpr = getDpr();
      this.ctx.translate(offset.x * dpr, offset.y * dpr);
      return this.ctx;
    }
  }

  grid() {
    if (!this.ctx) return;

    this.ctx.save();

    const zoom = getZoom();
    const dpr = getDpr();
    const canvas = this.ctx.canvas;
    const offset = { ...getOffset() };
    const size = { ...getSize() };

    const BASE_GRID_SIZE = 350;

    this.ctx.fillStyle = getComputedStyle(canvas).getPropertyValue(
      "--canvas-background",
    );
    this.ctx.strokeStyle = getComputedStyle(canvas).getPropertyValue(
      "--canvas-grid-cells",
    );

    this.ctx.lineWidth = Math.max(dpr / zoom, 0.1);

    const zoomFactor = 1 / (zoom * dpr);

    size.width *= zoomFactor;
    size.height *= zoomFactor;

    // Очистка и заливка всей области канваса
    // this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Округление координат до ближайшего шага сетки с запасом
    const startX = Math.floor(-offset.x / BASE_GRID_SIZE) * BASE_GRID_SIZE;
    const startY = Math.floor(-offset.y / BASE_GRID_SIZE) * BASE_GRID_SIZE;
    const endX =
      Math.ceil((-offset.x + size.width) / BASE_GRID_SIZE) * BASE_GRID_SIZE;
    const endY =
      Math.ceil((-offset.y + size.height) / BASE_GRID_SIZE) * BASE_GRID_SIZE;

    // Отрисовка вертикальных линий
    for (let x = startX; x <= endX; x += BASE_GRID_SIZE) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, startY);
      this.ctx.lineTo(x, endY);
      this.ctx.stroke();
    }

    // Отрисовка горизонтальных линий
    for (let y = startY; y <= endY; y += BASE_GRID_SIZE) {
      this.ctx.beginPath();
      this.ctx.moveTo(startX, y);
      this.ctx.lineTo(endX, y);
      this.ctx.stroke();
    }

    this.ctx.restore();

    return this.ctx;
  }
}
