"use server";

import { customFetch } from "@/const/fetch";
import { NewWeekSchedule, WeekSchedule } from "@/types/calendar";

export const createSchedule = async (
  uid: string,
  schedule?: NewWeekSchedule,
) => {
  return await customFetch<WeekSchedule | null>(`/schedule/${uid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });
};

export const getSchedule = async (uid: string) => {
  return await customFetch<WeekSchedule | null>(`/schedule/${uid}`);
};
