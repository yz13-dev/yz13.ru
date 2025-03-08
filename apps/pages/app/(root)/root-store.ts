import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  expanded: boolean;
};

type Actions = {
  setExpanded: (expanded: boolean) => void;
};

export const useRootStore = create<State & Actions>()(
  persist(
    (set) => ({
      expanded: true,
      setExpanded: (expanded: boolean) => set({ expanded }),
    }),
    { name: "position-storage" },
  ),
);

export const getExpanded = () => useRootStore.getState().expanded;
export const setExpanded = (expanded: boolean) =>
  useRootStore.getState().setExpanded(expanded);
