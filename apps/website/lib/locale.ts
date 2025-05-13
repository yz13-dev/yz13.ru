"use server";
import { cookies } from "next/headers";

export async function getLocaleFromCookie() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("language")?.value;
  if (!locale) return "RU";
  else return String(locale).toUpperCase();
}
