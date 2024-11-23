import { action } from "@/actions/workspace/post/action";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "yz13/supabase/server";

export async function GET(request: Request) {
  const cookieStore = cookies(); // Получение cookies
  const supabase = createClient(cookieStore); // Создание клиента Supabase

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error("Error retrieving user:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } else {
    const uid = user.id;
    console.log("User ID:", uid);
    const result = await action({ userId: uid });
    console.log("Result:", result);
    return NextResponse.redirect(new URL("/home", request.url));
  }
}
