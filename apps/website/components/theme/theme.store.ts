import { createStore } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "system" | "light" | "dark";

type Actions = {
  setTheme: (theme: Theme) => void;
};

type State = {
  theme: Theme;
};

export const useThemeStore = createStore<State & Actions>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: "theme",
    },
  ),
);

const isTheme = (token: string): boolean => {
  return ["system", "light", "dark"].includes(token);
};

const setTheme = (theme: Theme) => {
  useThemeStore.getState().setTheme(theme);
};

const getTheme = () => useThemeStore.getState().theme;

export { getTheme, isTheme, setTheme };

export default useThemeStore;
