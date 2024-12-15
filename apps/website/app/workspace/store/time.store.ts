import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { create } from "zustand";

dayjs.extend(timezone);
dayjs.extend(utc);

export const TZ = "Asia/Yekaterinburg";
type Action = {
  setTime: (date: Dayjs) => void;
};

type State = {
  time: Dayjs;
};

const useTimeStore = create<State & Action>((set) => ({
  time: dayjs().tz(TZ),
  setTime: (date: Dayjs) => set({ time: date }),
}));

export const getNewTime = () => dayjs().tz(TZ);

export const getTime = () => useTimeStore.getState().time;
export const setTime = (date: Dayjs) => useTimeStore.setState({ time: date });

export default useTimeStore;
