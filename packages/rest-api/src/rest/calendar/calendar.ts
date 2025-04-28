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

export const getUserEvents = async (uid: string) => {
  return await customFetch<Event[]>(`/calendar/user/${uid}`);
};
