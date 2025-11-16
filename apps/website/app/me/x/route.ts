import { x } from "@/const/socials"
import { redirect } from "next/navigation"



export async function GET() {

  // await postClicksV1Track({})

  return redirect(x)
}
