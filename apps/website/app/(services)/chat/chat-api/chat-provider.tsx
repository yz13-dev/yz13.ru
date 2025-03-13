"use client";

import { type ReactNode, createContext, useContext, useEffect } from "react";

import { Pricing } from "@/types/pricing";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { chat, createChatApi, setServices, Store } from "./chat-api";

export type StoreApi = ReturnType<typeof createChatApi>;

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export interface StoreProviderProps {
  children?: ReactNode;
  services?: Pricing[];
}

export const StoreProvider = ({ children, services }: StoreProviderProps) => {
  useEffect(() => {
    if (services && services.length !== 0) setServices(services);
  }, [services]);
  return <StoreContext.Provider value={chat}>{children}</StoreContext.Provider>;
};

export const useChatApi = <T,>(selector: (store: Store) => T): T => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error(`useStore must be used within StoreProvider`);
  } else return useStore(ctx, useShallow(selector));
};
