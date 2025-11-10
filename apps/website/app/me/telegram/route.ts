import { telegram } from "@/const/socials"
import { redirect } from "next/navigation"




export function GET() {
  return redirect(telegram)
}
