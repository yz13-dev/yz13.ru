"use client";
import { createContext, useContext } from "react";
import { create } from "zustand";

export type Coordinate = {
  x: number;
  y: number;
};
export type Size = {
  width: number;
  height: number;
};

type StoreActions = {
  setCtx: (ctx: CanvasRenderingContext2D | null) => void;
  setZoom: (zoom: number) => void;
  setOffset: (offset: Coordinate) => void;
  setSize: (size: Size) => void;
  setDpr: (dpr: number) => void;
};

type Store = {
  ctx: CanvasRenderingContext2D | null;
  dpr: number;
  zoom: number;
  offset: Coordinate;
  size: Size;
};

const useCanvasStore = create<Store & StoreActions>((set) => ({
  ctx: null,
  zoom: 0.4,
  offset: { x: 0, y: 0 },
  size: { width: 800, height: 600 },
  dpr: 1,
  setCtx: (ctx) => set(() => ({ ctx })),
  setZoom: (zoom) => set(() => ({ zoom })),
  setOffset: (offset) => set(() => ({ offset })),
  setSize: (size) => set(() => ({ size })),
  setDpr: (dpr) => set(() => ({ dpr })),
}));

export const getCanvas = (key: keyof Store): Store[keyof Store] => {
  return useCanvasStore.getState()[key];
};
export const getOffset = () => useCanvasStore.getState().offset;
export const getZoom = () => useCanvasStore.getState().zoom;
export const getSize = () => useCanvasStore.getState().size;
export const getDpr = () => useCanvasStore.getState().dpr;
export const setOffset = (offset: Coordinate) =>
  useCanvasStore.setState({ offset });
export const setZoom = (zoom: number) => useCanvasStore.setState({ zoom });
export const setSize = (size: Size) => useCanvasStore.setState({ size });
export const setDpr = (dpr: number) => useCanvasStore.setState({ dpr });
export const getCtx = () => useCanvasStore.getState().ctx;
export const setCtx = (ctx: CanvasRenderingContext2D | null) =>
  useCanvasStore.setState({ ctx });

export const setCanvas = (key: keyof Store, value: any) => {
  return useCanvasStore.setState({ [key]: value });
};

export const CanvasContext = createContext(useCanvasStore);

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }
  return context;
};

export default useCanvasStore;
