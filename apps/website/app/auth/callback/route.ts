import { API_URL } from "@/const/api";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL("/auth/callback", API_URL);
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "error while auth callback" });
  }
}
