"use client";
import { parse } from "date-fns";
import { createContext, ReactNode, useContext } from "react";
import { createStore } from "zustand";

type State = {
  date: Date;
};

type Actions = {
  setDate: (date: Date) => void;
};

type Store = State & Actions;

const initialState: State = {
  date: new Date(),
};

export const useCalendarStore = (state: State = initialState) => {
  return createStore<Store>()((set) => ({
    ...state,
    setDate: (date: Date) => {
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
  const pickedDate = parse(date ?? "", "yyyy-MM-dd", new Date());
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
