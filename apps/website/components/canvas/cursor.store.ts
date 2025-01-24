import { create } from "zustand";

type Store = {
  cursor: { x: number; y: number };
  setCursor: (cursor: { x: number; y: number }) => void;
};

export const useCursor = create<Store>((set) => ({
  cursor: { x: 0, y: 0 },
  setCursor: (cursor) => set(() => ({ cursor })),
}));

export const setCursorPosition = (x: number, y: number) => {
  const cursor = { x, y };
  useCursor.setState({ cursor });
};

export const getCursorPosition = () => useCursor.getState().cursor;
