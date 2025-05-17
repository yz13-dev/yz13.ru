"use server";
import { CountryCode } from "@/const/locale-to-country";
import Negotiator from "negotiator";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
export async function getLocale(
  request: NextRequest,
): Promise<string | undefined> {
  const locales = ["RU", "EN"];

  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  const language = new Negotiator({ headers: negotiatorHeaders }).language(
    locales,
  );

  // we are using map to convert the locales array of string literals to string array
  return language;
}
export async function getLocaleFromCookie() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("language")?.value;
  return String(locale).toUpperCase();
}
export async function setLocaleCookie(locale: CountryCode) {
  const cookieStore = await cookies();
  cookieStore.set("language", locale.toLowerCase(), {
    sameSite: "strict",
    path: "/",
  });
}
