import type { CalendarEvent } from "@/schemas/calendar-events";
import type { Meeting } from "@/schemas/meetings";
import { getV1AuthCurrentSession } from "@yz13/api";
import { parse } from "date-fns";

export async function getZoomMeetings(): Promise<Meeting[]> {
  const apiUrl = "https://api.zoom.us"
  const path = "/v2/users/me/meetings"
  const url = new URL(path, apiUrl)
  try {
    const session: any = await getV1AuthCurrentSession()
    const accessToken = session?.provider_token;
    const refreshToken = session?.provider_refresh_token;
    console.log("access token", !!accessToken)
    console.log("refresh token", !!refreshToken)
    if (!accessToken) {
      throw new Error("No access token found")
    }
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    if (!response.ok) {
      console.log(response.statusText)
      console.log(await response.text())
      return []
    }
    const data = await response.json();
    return data.meetings
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function createMeeting(token: string, event: CalendarEvent, timezone: string, user: { email: string, username: string, id: string }): Promise<Meeting | null> {
  const apiUrl = "https://api.zoom.us"
  const path = "/v2/users/me/meetings"
  const url = new URL(path, apiUrl)
  try {
    if (!event.duration) throw new Error("No duration found")
    const duration = parse(event.duration, "HH:mm:ss", new Date())
    const durationInMinutes = duration.getHours() * 60 + duration.getMinutes()
    const startAt = event.date_start
    console.log(
      {
        topic: event.summary, // title
        agenda: event.description, // description
        duration: durationInMinutes,
        pre_schedule: true,
        schedule_for: user.email, // email
        start_time: startAt, // "2022-03-25T07:32:55Z"
        type: 2,
        timezone, // timezone
      })
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: event.summary, // title
        agenda: event.description, // description
        duration: durationInMinutes,
        pre_schedule: true,
        start_time: startAt, // "2022-03-25T07:32:55Z"
        type: 2,
        timezone, // timezone
      })
    });
    if (!response.ok) {
      console.log(response.statusText)
      console.log(await response.text())
      return null
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
