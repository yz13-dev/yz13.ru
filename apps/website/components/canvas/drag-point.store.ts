import { create } from "zustand";
import { Coordinate } from "./api";

type State = {
  dragStart: Coordinate;
};

type Actions = {
  setDragStart: (dragStart: Coordinate) => void;
};

const useDragPointStore = create<State & Actions>()((set) => ({
  dragStart: { x: 0, y: 0 },
  setDragStart: (dragStart: Coordinate) => set({ dragStart }),
}));

const setDragStart = (dragStart: Coordinate) =>
  useDragPointStore.getState().setDragStart(dragStart);
const getDragStart = () => useDragPointStore.getState().dragStart;

export { getDragStart, setDragStart };
export default useDragPointStore;
