"use server";

import { customFetch } from "@/const/fetch";
import { Appointment, NewAppointment } from "@/types/calendar";

export const getAppointments = async (uid: string, date?: string) => {
  const url = date
    ? `/appointments/${uid}?date=${date}`
    : `/appointments/${uid}`;
  return customFetch<Appointment[]>(url, {
    method: "GET",
  });
};

export const createAppointment = async (
  uid: string,
  appointment: NewAppointment,
) => {
  return customFetch<Appointment>(`/appointments/${uid}`, {
    method: "POST",
    body: JSON.stringify(appointment),
  });
};
