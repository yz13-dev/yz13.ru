import { auth } from "@/lib/auth";
import { getV1EventsUserUid } from "@yz13/api";
import { format } from "date-fns";
import Calls from "./calls";



export default async function () {
  const user = await auth()

  if (!user) return null

  const date = format(new Date(), "yyyy-MM-dd")
  const data = await getV1EventsUserUid(user.id, {
    date,
    type: "appointment",
  })
  const calls = (data ?? []).filter(call => call.status === "CONFIRMED")

  return <Calls userId={user.id} calls={calls} />
}
