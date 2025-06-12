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

export async function getCalendar(id: string) {
  return customFetch<Calendar | null>(`/calendar/${id}`, {
    method: "GET",
  });
}

export async function createCalendar(uid: string, name: string) {
  return customFetch<Calendar>(`/calendar/user/${uid}`, {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

export async function updateCalendar(id: string, name: string) {
  return customFetch<Calendar>(`/calendar/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
  });
}

export async function deleteCalendar(id: string) {
  return customFetch<Calendar>(`/calendar/${id}`, {
    method: "DELETE",
  });
}
