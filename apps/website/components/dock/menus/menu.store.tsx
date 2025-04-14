import { ReactElement } from "react";
import { create } from "zustand";
import DockMenu from "./dock-menu";
import QuickSearchMenu from "./quick-search-menu";

type MenuProps = {
  [key: string]: any;
};

type Menu = {
  [key: string]: (props: MenuProps) => ReactElement;
};

export const menu: Menu = {
  dock: DockMenu,
  "quick-search": QuickSearchMenu,
};
export const Placeholder = () => <div></div>;

type State = {
  withOverlay: boolean;
  menuId: string | null;
};

type Actions = {
  setOverlay: (withOverlay: boolean) => void;
  setMenuId: (menuId: string | null) => void;
};

const useDockMenuStore = create<State & Actions>()((set) => ({
  withOverlay: false,
  menuId: null,
  setMenuId: (menuId: string | null) => set({ menuId }),
  setOverlay: (withOverlay: boolean) => set({ withOverlay }),
}));

const setMenuId = (menuId: string | null, withOverlay?: boolean) => {
  useDockMenuStore.getState().setMenuId(menuId);
  if (withOverlay) setOverlay(withOverlay);
};
const getMenuId = () => useDockMenuStore.getState().menuId;

const toggleMenu = (menuId?: string, withOverlay?: boolean) => {
  const toggle = getMenuId() === menuId ? null : (menuId ?? null);
  setMenuId(toggle);
  if (toggle && withOverlay) setOverlay(true);
  if (!toggle) setOverlay(false);
};
const setOverlay = (withOverlay: boolean) =>
  useDockMenuStore.getState().setOverlay(withOverlay);
const getOverlay = () => useDockMenuStore.getState().withOverlay;
const toggleOverlay = () => setOverlay(!getOverlay());

export {
  getMenuId,
  getOverlay,
  setMenuId,
  setOverlay,
  toggleMenu,
  toggleOverlay
};

export default useDockMenuStore;
