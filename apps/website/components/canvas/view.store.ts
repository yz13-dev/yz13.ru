"use client";
import { createContext, useContext } from "react";
import { create } from "zustand";
import {
  Coordinate,
  getDpr,
  getOffset,
  getSize,
  getZoom,
  Size,
} from "./canvas.store";

export type View = Size & Coordinate;

type StoreActions = {
  setView: (view: View) => void;
};
type Store = {
  view: View;
};

const calcView = () => {
  const offset = getOffset();
  const zoom = Math.max(getZoom(), 0.01);
  const size = getSize();
  const dpr = Math.max(getDpr(), 1);

  const zoomFactor = 1 / (zoom * dpr);

  const offsetX = -offset.x;
  const offsetY = -offset.y;

  const scaled = (value: number) => Math.round(value * zoomFactor);

  return {
    x: scaled(offsetX),
    y: scaled(offsetY),
    width: scaled(size.width),
    height: scaled(size.height),
  };
};

export const calcCustomView = (offset: Coordinate) => {
  const zoom = getZoom();
  const size = getSize();
  const dpr = getDpr();

  const canvasWidth = size.width * dpr;
  const canvasHeight = size.height * dpr;
  // Для корректного масштаба используем zoom напрямую
  const zoomFactor = 1 / (zoom * dpr);

  // Смещение с учётом зума и dpr
  const offsetX = -offset.x * dpr;
  const offsetY = -offset.y * dpr;

  return {
    x: offsetX * zoomFactor, // Умножаем на zoomFactor для получения координат с учётом масштаба и dpr
    y: offsetY * zoomFactor, // Умножаем на zoomFactor для получения координат с учётом масштаба и dpr
    width: canvasWidth * zoomFactor, // Умножаем ширину канваса на zoomFactor
    height: canvasHeight * zoomFactor, // Умножаем высоту канваса на zoomFactor
  };
};

const useCanvasViewStore = create<Store & StoreActions>((set) => ({
  view: { width: 800, height: 600, x: 0, y: 0 },
  setView: (view) => set(() => ({ view })),
}));

export const getCanvasViewStore = (key: keyof Store) =>
  useCanvasViewStore.getState()[key];

export const getView = () => useCanvasViewStore.getState().view;
export const setView = (view: View) => useCanvasViewStore.setState({ view });

export const setCanvasView = (view: View) =>
  useCanvasViewStore.getState().setView(view);

export const calculateNewView = () => {
  const view = calcView();
  setCanvasView(view);
  return view;
};

export const CanvasViewContext = createContext(useCanvasViewStore);

export const useCanvasView = () => {
  const context = useContext(CanvasViewContext);
  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }
  return context;
};

export default useCanvasViewStore;
