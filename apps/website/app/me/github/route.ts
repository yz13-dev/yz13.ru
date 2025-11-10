import { github } from "@/const/socials"
import { redirect } from "next/navigation"




export function GET() {
  return redirect(github)
}
