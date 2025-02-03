"use client";
import { DndContext } from "@dnd-kit/core";

type DndContextProps = {
  children?: React.ReactNode;
};
const DndContextWrapper = ({ children }: DndContextProps) => {
  return <DndContext>{children}</DndContext>;
};

export default DndContextWrapper;
