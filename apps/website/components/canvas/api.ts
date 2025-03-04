import { isEqual } from "lodash";
import { createStore } from "zustand/vanilla";

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

export type Coordinate = {
  x: number;
  y: number;
};
export type Size = {
  width: number;
  height: number;
};
export type View = Coordinate & Size;

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
  selected: any[];
  elements: any[];
  cursor: Coordinate;
  view: View;
  zoom: number;
  dpr: number;
  offset: Coordinate;
  canvas: CanvasState;
  settings: Settings;
  flags: Flags;
};

export type Actions = {};

export type Store = State & Actions;

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
  selected: [],
  elements: [],
  cursor: initialCursor,
  view: initialView,
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

// api.subscribe((state) => console.log(JSON.stringify(state, null, 2)));

export const getFlag = (flag: keyof Flags) => api.getState().flags[flag];

export const getOffset = () => api.getState().offset;
export const setOffset = (offset: Coordinate) => {
  api.setState((state) => {
    const zoom = state.zoom;
    const dpr = state.dpr;
    const zoomFactor = 1 / (zoom * dpr);
    const viewX = offset.x * zoomFactor;
    const viewY = offset.y * zoomFactor;
    return {
      offset: isEqual(state.offset, offset) ? state.offset : offset,
      view: {
        ...state.view,
        x: -viewX * state.dpr,
        y: -viewY * state.dpr,
      },
    };
  });
};

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
    const dpr = state.dpr;
    const zoomFactor = 1 / (zoom * dpr);
    const viewWidth = width * zoomFactor;
    const viewHeight = height * zoomFactor;
    return {
      canvas: {
        ...state.canvas,
        width,
        height,
      },
      view: {
        x: state.view.x,
        y: state.view.y,
        width: viewWidth * state.dpr,
        height: viewHeight * state.dpr,
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
    cursor: isEqual(state.cursor, cursor) ? state.cursor : cursor,
  }));
};

export const getView = () => api.getState().view;

export const setZoom = (zoom: number) =>
  api.setState((state) => {
    const dpr = state.dpr;
    const zoomFactor = 1 / (zoom * dpr);
    const viewX = Math.abs(state.offset.x) * zoomFactor;
    const viewY = Math.abs(state.offset.y) * zoomFactor;
    const viewWidth = state.canvas.width * zoomFactor;
    const viewHeight = state.canvas.height * zoomFactor;
    return {
      zoom: state.zoom !== zoom ? zoom : state.zoom,
      view: {
        x: viewX * dpr,
        y: viewY * dpr,
        width: viewWidth * dpr,
        height: viewHeight * dpr,
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
