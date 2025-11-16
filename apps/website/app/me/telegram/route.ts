import { telegram } from "@/const/socials"
import { postClicksV1Track } from "@yz13/api"
import { redirect } from "next/navigation"




export async function GET() {

  await postClicksV1Track({
    path: "/me/telegram",
  })

  return redirect(telegram)
}
