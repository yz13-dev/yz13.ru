"use server";

import { customFetch } from "@/const/fetch";
import { Appointment } from "@/types/calendar";

export const getAppointments = async (uid: string) => {
  return customFetch<Appointment[]>(`/appointments/${uid}`, {
    method: "GET",
  });
};
