import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
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

export const getNewTime = () => dayjs().tz(TZ).locale("ru");

const useTimeStore = create<State & Action>((set) => ({
  time: getNewTime(),
  setTime: (date: Dayjs) => set({ time: date }),
}));

export const getTime = () => useTimeStore.getState().time;
export const setTime = (date: Dayjs) => useTimeStore.setState({ time: date });

export default useTimeStore;
