import { github } from "@/const/socials"
import { postClicksV1Track } from "@yz13/api"
import { redirect } from "next/navigation"




export async function GET() {

  await postClicksV1Track({
    path: "/me/github",
  })

  return redirect(github)
}
