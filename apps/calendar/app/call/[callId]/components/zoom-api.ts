"use server";

import type { Event } from "rest-api/types/calendar";


export const createMeeting = async (token: string, call: Event, timezone: string) => {
  try {
    const url = new URL("/meetings", "https://localhost:3000")
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        event: call,
        timezone,
      }),
    })
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
    return null;
  }
}
