"use server";

import { customFetch } from "@/const/fetch";
import {
  NewWeekSchedule,
  ScheduleAvailability,
  UpdateWeekSchedule,
  WeekSchedule,
} from "@/types/calendar";

export const createSchedule = async (
  uid: string,
  schedule?: NewWeekSchedule,
) => {
  return await customFetch<WeekSchedule | null>(`/calendar/schedule/${uid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });
};

export const getSchedule = async (uid: string) => {
  return await customFetch<WeekSchedule | null>(`/calendar/schedule/${uid}`);
};

export const updateSchedule = async (
  uid: string,
  schedule: UpdateWeekSchedule,
) => {
  return await customFetch<WeekSchedule | null>(`/calendar/schedule/${uid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });
};

export const getUserAvailability = async (uid: string, date?: string) => {
  const url = date
    ? `/calendar/schedule/${uid}/available?date=${date}`
    : `/calendar/schedule/${uid}/available`;
  return await customFetch<ScheduleAvailability>(url);
};
