"use client";

import { type ReactNode, createContext, useContext, useEffect } from "react";

import { ChatRoom } from "@/types/chat";
import { Pricing } from "@/types/pricing";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { chat, createChatApi, setChats, setServices, Store } from "./chat-api";

export type StoreApi = ReturnType<typeof createChatApi>;

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export interface StoreProviderProps {
  children?: ReactNode;
  services?: Pricing[];
  chats?: ChatRoom[];
}

export const StoreProvider = ({
  children,
  services,
  chats,
}: StoreProviderProps) => {
  useEffect(() => {
    if (services && services.length !== 0) setServices(services);
  }, [services]);
  useEffect(() => {
    if (chats && chats.length !== 0) setChats(chats);
  }, [chats]);
  return <StoreContext.Provider value={chat}>{children}</StoreContext.Provider>;
};

export const useChatApi = <T,>(selector: (store: Store) => T): T => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error(`useStore must be used within StoreProvider`);
  } else return useStore(ctx, useShallow(selector));
};
