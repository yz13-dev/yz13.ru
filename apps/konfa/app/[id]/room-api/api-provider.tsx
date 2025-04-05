"use client";
import { type ReactNode, createContext, useContext, useEffect } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { createRoomApi, InitialState, Store } from "./api";

export type StoreApi = ReturnType<typeof createRoomApi>;

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export interface StoreProviderProps {
  initialState?: Partial<InitialState>;
  children?: ReactNode;
}

export default function StoreProvider({
  initialState,
  children,
}: StoreProviderProps) {
  const room = createRoomApi(initialState);
  return <StoreContext.Provider value={room}>{children}</StoreContext.Provider>;
}

export const useRoomApi = <T,>(selector: (store: Store) => T): T => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error(`useStore must be used within StoreProvider`);
  } else return useStore(ctx, useShallow(selector));
};
