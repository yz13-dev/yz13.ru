"use server";
import { customFetch } from "@/const/fetch";
import type { Event, NewEvent, UpdateEvent } from "@/types/calendar";

export const createEvent = async (event: NewEvent) => {
  return await customFetch<Event | null>("/calendar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
};

type GetEventsParams = {
  type?: Event["type"];
  date?: string;
  start?: string;
  end?: string;
  limit?: number;
};
export const getUserEvents = async (
  uid: string,
  params: GetEventsParams = {},
) => {
  const keys = Object.keys(params ?? {});
  const searchParams = keys
    .map((key) => {
      const param = params[key as keyof GetEventsParams];
      if (!param) return "";
      return `${key}=${param}`;
    })
    .join("&");

  const url = keys.length !== 0
    ? `/calendar/user/${uid}?${searchParams}`
    : `/calendar/user/${uid}`;
  return await customFetch<Event[]>(url);
};


export const getEventById = async (id: string) => {
  return await customFetch<Event | null>(`/calendar/event/${id}`);
};


export const updateEvent = async (id: string, event: UpdateEvent) => {
  return await customFetch<Event | null>(`/calendar/event/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
};
