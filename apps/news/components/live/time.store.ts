import { create } from "zustand";

export const TZ = "Asia/Yekaterinburg";
type Action = {
  setTime: (date: Date) => void;
};

type State = {
  time: Date;
};

export const getNewTime = () => new Date();

const useTimeStore = create<State & Action>((set) => ({
  time: getNewTime(),
  setTime: (date: Date) => set({ time: date }),
}));

export const getTime = () => useTimeStore.getState().time;
export const setTime = (date: Date) => useTimeStore.setState({ time: date });

export default useTimeStore;
