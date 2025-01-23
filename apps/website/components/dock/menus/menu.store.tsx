import { create } from "zustand";
import DockMenu from "./dock-menu";

type MenuProps = {
  [key: string]: any;
};

type Menu = {
  [key: string]: (props: MenuProps) => JSX.Element;
};

export const menu: Menu = {
  dock: DockMenu,
};
export const Placeholder = () => <div></div>;

type State = {
  menuId: string | null;
};

type Actions = {
  setMenuId: (menuId: string | null) => void;
};

const useDockMenuStore = create<State & Actions>()((set) => ({
  menuId: null,
  setMenuId: (menuId: string | null) => set({ menuId }),
}));

const setMenuId = (menuId: string | null) =>
  useDockMenuStore.getState().setMenuId(menuId);
const getMenuId = () => useDockMenuStore.getState().menuId;

const toggleMenu = (menuId?: string) => {
  const toggle = getMenuId() === menuId ? null : (menuId ?? null);
  setMenuId(toggle);
};
export { getMenuId, setMenuId, toggleMenu };

export default useDockMenuStore;
