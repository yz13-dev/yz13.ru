"use client";
import { useEffect } from "react";
import { getAuthorizedUser } from "rest-api/auth";
import { UserObject } from "rest-api/types/user";
import { create } from "zustand";

type Actions = {
  refreshUser: () => void;
  setUser: (user: UserObject) => void;
};
type State = {
  user: UserObject | null;
};

const useUserStore = create<State & Actions>()((set) => ({
  user: null,
  refreshUser: () => {
    getAuthorizedUser().then((user) => {
      const { data } = user;
      if (data) {
        set({ user: data });
      }
    });
  },
  setUser: (user) => set({ user }),
}));

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    if (user) return;
    getAuthorizedUser().then((user) => {
      const { data } = user;
      if (data) {
        setUser(data);
      }
    });
  }, []);
  return children;
};

export { UserProvider, useUserStore };

// export default useFieldStore;
