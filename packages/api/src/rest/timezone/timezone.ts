"use server"

import { customFetch } from "@/const/fetch"
import type { Timezone } from "@/types/timezone"



export async function getTimezones() {
  return customFetch<Timezone>("/timezones")
}
