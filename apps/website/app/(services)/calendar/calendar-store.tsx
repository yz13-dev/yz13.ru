"use client";
import dayjs, { Dayjs } from "dayjs";
import { createContext, ReactNode, useContext } from "react";
import { createStore } from "zustand";

type State = {
  date: Dayjs;
};

type Actions = {
  setDate: (date: Dayjs) => void;
};

type Store = State & Actions;

const initialState: State = {
  date: dayjs().locale("ru"),
};

export const useCalendarStore = (state: State = initialState) => {
  return createStore<Store>()((set) => ({
    ...state,
    setDate: (date: Dayjs) => {
      set(() => ({ date }));
    },
  }));
};

export const CalendarContext = createContext<Partial<Store>>({} as Store);

export const CalendarProvider = ({
  children,
  date,
}: {
  date?: string;
  children?: ReactNode;
}) => {
  const pickedDate = dayjs(date ?? "").locale("ru");
  return (
    <CalendarContext.Provider value={{ date: pickedDate }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};
