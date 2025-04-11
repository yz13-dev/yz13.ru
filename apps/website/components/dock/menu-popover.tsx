"use client";
import { AnimatePresence } from "motion/react";
import useDockMenuStore, { menu, Placeholder } from "./menus/menu.store";

export default function MenuPopover() {
  const menuId = useDockMenuStore((state) => state.menuId);
  const menuItem = menuId ? menu[menuId] : null;
  const Menu = menuId && menuItem ? menuItem : Placeholder;
  return <AnimatePresence>{menuId && <Menu />}</AnimatePresence>;
}
