import { x } from "@/const/socials"
import { redirect } from "next/navigation"




export function GET() {
  return redirect(x)
}
