import { createStore } from "zustand";
import { persist } from "zustand/middleware";

type Actions = {
  setVisitorId: (visitorId: string) => void;
};
type State = {
  visitorId: string | null;
};

const useVisitorStore = createStore<State & Actions>()(
  persist(
    (set) => ({
      visitorId: null,
      setVisitorId: (visitorId) => set({ visitorId }),
    }),
    {
      name: "visitor",
    },
  ),
);

const setVisitorId = (visitorId: string) => {
  useVisitorStore.getState().setVisitorId(visitorId);
};

const getVisitorId = () => useVisitorStore.getState().visitorId;

export { getVisitorId, setVisitorId };
export default useVisitorStore;
