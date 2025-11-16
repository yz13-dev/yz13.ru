import { x } from "@/const/socials"
import { postClicksV1Track } from "@yz13/api"
import { redirect } from "next/navigation"



export async function GET() {

  await postClicksV1Track({
    path: "/me/x",
  })

  return redirect(x)
}
