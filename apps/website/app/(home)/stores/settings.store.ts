import { create } from "zustand";

type Action = {
  setOpen: (open: boolean) => void;
};
type State = {
  open: boolean;
};

export const useSettingsStore = create<State & Action>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
