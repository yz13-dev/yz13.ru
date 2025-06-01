import ld from "lodash";
import { createStore } from "zustand/vanilla";

export type Coordinate = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type View = Coordinate & Size;

export type Element = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  code: string;
}


type CanvasState = {
  ctx: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  border: Partial<{
    top: number;
    right: number;
    bottom: number;
    left: number;
  }> | null;
};

type Flags = {
  grid: boolean;
  rulers: boolean;
};

type Settings = {
  resizeRange: number;
  rotateRange: number;
  zoomStep: number;
  panFactor: number;
};

export type State = {
  shiftPressed: boolean;
  contextMenu: boolean;
  cursor: Coordinate;
  targetCode: Element["code"] | null;
  view: View;
  zoom: number;
  elements: Element[];
  dpr: number;
  offset: Coordinate;
  canvas: CanvasState;
  settings: Settings;
  flags: Flags;
};

// export type Actions = {};

export type Store = State; // &Action;

const initialView: View = {
  x: 0,
  y: 0,
  width: 800,
  height: 600,
};

const initialCanvas: CanvasState = {
  ctx: null,
  width: 800,
  height: 600,
  border: null,
};

const initialCursor: Coordinate = {
  x: 0,
  y: 0,
};

const initialOffset: Coordinate = {
  x: 0,
  y: 0,
};

const initialSettings: Settings = {
  resizeRange: 2.5,
  rotateRange: 2.5,
  zoomStep: 0.035,
  panFactor: 2.5,
};


export const initialState: State = {
  contextMenu: false,
  shiftPressed: false,
  cursor: initialCursor,
  view: initialView,
  targetCode: null,
  elements: [],
  zoom: 1,
  dpr: 1,
  offset: initialOffset,
  canvas: initialCanvas,
  settings: initialSettings,
  flags: {
    grid: false,
    rulers: false,
  },
};

export const createMapApi = (initState: Partial<State> = initialState) => {
  const state = { ...initialState, ...initState };
  return createStore<Store>()((set) => ({
    ...state,
  }));
};

export const api = createMapApi({
  flags: {
    grid: true,
    rulers: true,
  },
});

export const setCode = (code: Element["code"] | null) => {
  api.setState((state) => ({
    targetCode: state.targetCode !== code ? code : state.targetCode,
  }));
};

export const getFlag = (flag: keyof Flags) => api.getState().flags[flag];

export const getOffset = () => api.getState().offset;
export const setOffset = (offset: Coordinate) => {
  api.setState((state) => {
    const zoom = state.zoom;
    const dpr = state.dpr;
    const zoomFactor = 1 / (zoom * dpr);
    const viewX = Math.floor(offset.x * zoomFactor);
    const viewY = Math.floor(offset.y * zoomFactor);
    return {
      offset: ld.isEqual(state.offset, offset) ? state.offset : offset,
      view: {
        ...state.view,
        x: -viewX * state.dpr,
        y: -viewY * state.dpr,
      },
    };
  });
};

export const setContextMenu = (contextMenu: boolean) =>
  api.setState((state) => ({
    contextMenu:
      state.contextMenu !== contextMenu ? contextMenu : state.contextMenu,
  }));

export const getSize = (): Size => {
  const canvas = api.getState().canvas;
  return {
    width: canvas.width,
    height: canvas.width,
  };
};
export const setSize = (size: Size) => {
  api.setState((state) => {
    const width =
      state.canvas.width !== size.width ? size.width : state.canvas.width;
    const height =
      state.canvas.height !== size.height ? size.height : state.canvas.height;
    const zoom = state.zoom;
    const viewWidth = Math.floor(width * zoom);
    const viewHeight = Math.floor(height * zoom);
    return {
      canvas: {
        ...state.canvas,
        width,
        height,
      },
      view: {
        x: state.view.x,
        y: state.view.y,
        width: viewWidth,
        height: viewHeight,
      },
    };
  });
};

export const getCtx = () => api.getState().canvas.ctx;
export const setCtx = (ctx: CanvasRenderingContext2D | null) => {
  api.setState((state) => ({
    canvas: {
      ...state.canvas,
      ctx: ctx,
    },
  }));
};

export const getCursor = () => api.getState().cursor;
export const setCursor = (cursor: Coordinate) => {
  api.setState((state) => ({
    cursor: ld.isEqual(state.cursor, cursor) ? state.cursor : cursor,
  }));
};

export const getView = () => api.getState().view;

export const setZoom = (zoom: number) =>
  api.setState((state) => {
    const viewX = Math.floor(Math.abs(state.offset.x) * zoom);
    const viewY = Math.floor(Math.abs(state.offset.y) * zoom);
    const viewWidth = Math.floor(state.canvas.width * zoom);
    const viewHeight = Math.floor(state.canvas.height * zoom);
    return {
      zoom: state.zoom !== zoom ? zoom : state.zoom,
      view: {
        x: viewX,
        y: viewY,
        width: viewWidth,
        height: viewHeight,
      },
    };
  });
export const getZoom = () => api.getState().zoom;
export const setDpr = (dpr: number) =>
  api.setState((state) => ({
    dpr: state.dpr !== dpr ? dpr : state.dpr,
  }));
export const getDpr = () => api.getState().dpr;

export const getZoomStep = () => api.getState().settings.zoomStep;
export const getPanFactor = () => api.getState().settings.panFactor;
export const setZoomStep = (zoomStep: number) =>
  api.setState((state) => ({
    ...state,
    settings: { ...state.settings, zoomStep },
  }));
export const setPanFactor = (panFactor: number) =>
  api.setState((state) => ({ settings: { ...state.settings, panFactor } }));

export const getResizeRange = () => api.getState().settings.resizeRange;
export const setResizeRange = (resizeRange: number) =>
  api.setState((state) => ({ settings: { ...state.settings, resizeRange } }));
export const getRotateRange = () => api.getState().settings.rotateRange;
export const setRotateRange = (rotateRange: number) =>
  api.setState((state) => ({ settings: { ...state.settings, rotateRange } }));

export const getBorder = () => api.getState().canvas.border;
