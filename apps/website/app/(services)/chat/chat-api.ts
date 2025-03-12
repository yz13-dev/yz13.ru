import { Pricing } from "@/types/pricing";
import { createStore } from "zustand";

export type Store = {
  type: string | null;
  services: Pricing[];
};

const initialState: Store = {
  type: null,
  services: [],
};

export const createChatApi = (initState: Partial<Store> = initialState) => {
  const state = { ...initialState, ...initState };
  return createStore<Store>()((set) => ({
    ...state,
  }));
};

export const chat = createChatApi();

export const setChatType = (type: string | null) =>
  chat.setState(() => ({ type }));

export const setServices = (services: Pricing[]) =>
  chat.setState(() => ({ services }));
