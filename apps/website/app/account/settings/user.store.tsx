"use client";
import { getV1AuthCurrent } from "@yz13/api";
import { GetV1UserUid200 } from "@yz13/api/types";
import { useEffect } from "react";
import { create } from "zustand";

type UserObject = GetV1UserUid200;

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
    getV1AuthCurrent().then((user) => {
      if (user) {
        set({ user });
      }
    });
  },
  setUser: (user) => set({ user }),
}));

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    getV1AuthCurrent().then((data) => {
      if (data) setUser(data);
    });
  }, []);
  return children;
};

export { UserProvider, useUserStore };

// export default useFieldStore;
