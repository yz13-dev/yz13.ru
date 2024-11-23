import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "yz13/supabase/server";

export async function GET(request: Request) {
  const cookieStore = cookies(); // Получение cookies
  const supabase = createClient(cookieStore); // Создание клиента Supabase

  const AUTH_PATH = "/auth/login";
  const HOME_PATH = "/";

  const init = await supabase.auth.initialize();
  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  console.log("Initialization:", init);
  console.log("User:", user);

  if (!user) {
    // Если пользователь отсутствует, выполняем анонимный вход
    const { data: anonData, error: anonError } =
      await supabase.auth.signInAnonymously();
    console.log("Anonymous login success:", !!anonData, "Error:", !!anonError);

    if (anonError) {
      console.error("Error during anonymous login:", anonError);
      return NextResponse.redirect(new URL(AUTH_PATH, request.url));
    }

    const { session } = anonData;
    if (session) {
      console.log("Session initialized:", session);

      // Явно обновляем сессию
      await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });

      // Запускаем автообновление токенов
      await supabase.auth.startAutoRefresh();

      // Перенаправляем на домашнюю страницу
      return NextResponse.redirect(new URL(HOME_PATH, request.url));
    } else {
      console.error("Session not found after anonymous login");
      return NextResponse.redirect(new URL(AUTH_PATH, request.url));
    }
  }

  // Если пользователь уже авторизован, перенаправляем на главную
  return NextResponse.redirect(new URL(HOME_PATH, request.url));
}
