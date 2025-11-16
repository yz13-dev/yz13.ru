import { github } from "@/const/socials"
import { postClicksV1Track } from "@yz13/api"
import { redirect } from "next/navigation"




export async function GET() {

  const response = await postClicksV1Track({
    path: "/me/github",
  })
  console.log("response", response)

  return redirect(github)
}
