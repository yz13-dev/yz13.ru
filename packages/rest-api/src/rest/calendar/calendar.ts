"use server"

import { customFetch } from "@/const/fetch";
import type { Calendar } from "@/types/calendar";


export async function getCalendars(uid: string) {
  return customFetch<Calendar[]>(`/calendar/user/${uid}`, {
    method: "GET",
  });
}

export async function getDefaultCalendar(uid: string) {
  return customFetch<Calendar | null>(`/calendar/user/${uid}/default`, {
    method: "GET",
  });
}
