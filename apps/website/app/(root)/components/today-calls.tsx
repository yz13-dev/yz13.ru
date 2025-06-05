import { auth } from "@/lib/auth";
import { format } from "date-fns";
import { getUserEvents } from "rest-api/calendar";
import Calls from "./calls";



export default async function () {
  const user = await auth()
  if (!user) return null
  const date = format(new Date(), "yyyy-MM-dd")
  const { data } = await getUserEvents(user.id, {
    date,
    type: "appointment",
  })
  const calls = (data ?? []).filter(call => call.status === "CONFIRMED")

  return <Calls userId={user.id} calls={calls} />
}
