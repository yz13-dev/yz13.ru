import { Hono } from "hono";
import { getAuthorizedSession } from "rest-api/auth";
import { Event } from "rest-api/types/calendar";
import { getUsersById } from "rest-api/user";
import { createMeeting, getZoomMeetings } from "./actions";

export const meetings = new Hono();



meetings.get("/", async (c) => {

  const { data: session } = await getAuthorizedSession()

  const user = session?.user;

  const identities = user?.identities ?? [];

  const hasZoomIdentity = identities.find((identity) => identity.provider === "zoom");

  if (!hasZoomIdentity) {
    return c.json({ error: "No Zoom identity found" }, 401);
  }

  const meetings = await getZoomMeetings()

  return c.json(meetings, 200)
})

meetings.post("/", async (c) => {

  const authorization = c.req.header("Authorization");

  const token = authorization?.replace("Bearer ", "")

  // console.log("token", token)

  if (!token) {
    console.log("no token provided")
    return c.json(null, 400);
  }

  const body = await c.req.json();

  const event = body.event as Event | null

  if (!event) {
    console.log("no event provided")
    return c.json(null, 400);
  }

  const timezone = body.timezone;

  const users = await getUsersById(event.guests ?? [])

  const organizerId = event.organizer_id;

  const preparedUsers = users.map(user => ({
    id: user.id,
    email: user.email,
    username: user.username,
  }))

  const allUsersHasEmail = preparedUsers.every(user => user.email)

  if (!allUsersHasEmail) {
    console.log("all users has email", preparedUsers)
    return c.json(null, 400);
  }

  const preparedUsersWithoutOrganizer = preparedUsers.filter(user => user.id !== organizerId)

  const user = preparedUsers.length === 1 ? preparedUsers[0] : preparedUsersWithoutOrganizer[0]

  if (!user) {
    console.log("user", user)
    return c.json(null, 400);
  }

  if (!user.email) {
    console.log("user", user)
    return c.json(null, 400);
  }

  const meeting = await createMeeting(token, event, timezone, user as { email: string, username: string, id: string })

  // console.log("users", preparedUsers)

  console.log("meeting", meeting)

  return c.json(meeting, 200)
})
