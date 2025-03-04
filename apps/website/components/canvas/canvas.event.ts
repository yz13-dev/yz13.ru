import { create } from "zustand";

type State = {
  event: string | null;
};

type Actions = {
  setEvent: (event: string | null) => void;
};

const useCanvasEventStore = create<State & Actions>()((set) => ({
  event: null,
  setEvent: (event: string | null) => set({ event }),
}));

export const setEvent = (event: string | null) =>
  useCanvasEventStore.setState({ event });
export const getEvent = () => useCanvasEventStore.getState().event;

export default useCanvasEventStore;
