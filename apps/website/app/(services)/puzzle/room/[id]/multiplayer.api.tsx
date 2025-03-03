"use client";
import { Coordinate } from "@/components/canvas/api";
import { User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

type State = {
  users: Record<string, User>;
  cursors: Record<string, Coordinate>;
};
export type Actions = {};

type Store = State & Actions;

const initialState: State = {
  users: {},
  cursors: {},
};

export const createMultiplayerApi = (
  initState: Partial<State> = initialState,
) => {
  const state = { ...initialState, ...initState };
  return createStore<Store>()((set) => ({
    ...state,
  }));
};

const api = createMultiplayerApi();

api.subscribe((state) => {
  console.log(state);
});

const getUsers = () => {
  const users = api.getState().users;
  const keys = Object.keys(users);
  const values = keys.map((key) => users[key]);
  return { ids: keys, users: values };
};
const getUser = (id: string) => api.getState().users[id];
const setUser = (user: User) => {
  api.setState((state) => ({
    users: {
      ...state.users,
      [user.id]: user,
    },
  }));
};
export { getUser, getUsers, setUser };

const getCursors = () => {
  return api.getState().cursors;
};
const setCursor = (id: string, cursor: Coordinate) => {
  api.setState((state) => ({
    cursors: {
      ...state.cursors,
      [id]: cursor,
    },
  }));
};
export { getCursors, setCursor };

export type StoreApi = ReturnType<typeof createMultiplayerApi>;

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export interface StoreProviderProps {
  children?: React.ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
};

export const useMultiplayerApi = <T,>(selector: (store: Store) => T): T => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error(`useStore must be used within StoreProvider`);
  } else return useStore(ctx, useShallow(selector));
};
