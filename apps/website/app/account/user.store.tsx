"use client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";

type Actions = {
  setUser: (user: User) => void;
};
type State = {
  user: User | null;
};

const UserContext = createContext<StoreApi<State & Actions>>(
  {} as StoreApi<State & Actions>,
);

const UserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) => {
  const [store] = useState(() =>
    createStore<State & Actions>()((set) => ({
      user,
      setUser: (user) => set({ user }),
    })),
  );
  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
};

const useUser = (selector: (state: State & Actions) => any) => {
  const store = useContext(UserContext);
  if (!store) throw new Error("useField must be used within a FieldProvider");
  return useStore(store, selector);
};

// const useFieldStore = useField((state) => state);

export { UserContext, UserProvider, useUser };

// export default useFieldStore;
