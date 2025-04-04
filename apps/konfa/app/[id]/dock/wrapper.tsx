"use client";
import { CSSProperties } from "react";
import { create } from "zustand";

type State = {
  height: number;
};

type Actions = {
  setHeight: (height: number) => void;
};

export const useDock = create<State & Actions>()((set) => ({
  height: 0,
  setHeight: (height: number) => set({ height }),
}));

type WrapperProps = {
  children?: React.ReactNode;
};
export default function Wrapper({ children }: WrapperProps) {
  const height = useDock((state) => state.height);
  return (
    <div
      style={
        {
          "--controls-height": `${height}px`,
        } as CSSProperties
      }
      className="w-full flex flex-col h-dvh divide-y"
    >
      {children}
    </div>
  );
}
