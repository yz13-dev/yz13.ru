import { x } from "@/const/socials"
import { redirect } from "next/navigation"



export async function GET() {
  return redirect(x)
}
