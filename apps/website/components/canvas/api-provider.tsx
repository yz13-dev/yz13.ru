"use client";

import { type ReactNode, createContext, useContext, useEffect } from "react";

import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { type Store, api, createMapApi, setDpr } from "./api";

export type StoreApi = ReturnType<typeof createMapApi>;

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export interface StoreProviderProps {
  children?: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateDPR = () => {
        setDpr(window.devicePixelRatio);
      };

      setDpr(window.devicePixelRatio);

      const mediaQuery = window.matchMedia(
        `(resolution: ${window.devicePixelRatio}dppx)`,
      );

      mediaQuery.addEventListener("change", updateDPR);

      return () => {
        mediaQuery.removeEventListener("change", updateDPR);
      };
    }
  }, []);
  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
};

export const useMapApi = <T,>(selector: (store: Store) => T): T => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error(`useStore must be used within StoreProvider`);
  } else return useStore(ctx, useShallow(selector));
};
