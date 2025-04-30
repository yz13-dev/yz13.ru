"use server";

import { customFetch } from "@/const/fetch";
import { Event, NewEvent } from "@/types/calendar";

export const createEvent = async (event: NewEvent) => {
  return await customFetch<Event | null>("/calendar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
};

export const getUserEvents = async (uid: string, date?: string) => {
  const url = date
    ? `/calendar/user/${uid}?date=${date}`
    : `/calendar/user/${uid}`;
  return await customFetch<Event[]>(url);
};
