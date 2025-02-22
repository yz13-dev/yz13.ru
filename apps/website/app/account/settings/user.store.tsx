"use client";
import { User } from "@supabase/supabase-js";
import { useEffect } from "react";
import { createClient } from "yz13/supabase/client";
import { create } from "zustand";

type Actions = {
  setUser: (user: User) => void;
};
type State = {
  user: User | null;
};

const useUserStore = create<State & Actions>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    if (user) return;
    const supabase = createClient();
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      }
    });
  }, []);
  return children;
};

export { UserProvider, useUserStore };

// export default useFieldStore;
