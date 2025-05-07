"use client";
import { Loader2Icon } from "lucide-react";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { Label } from "mono/components/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ComponentPropsWithoutRef, useState } from "react";
import { cn } from "yz13/cn";
import { createClient } from "yz13/supabase/client";

type FormProps = ComponentPropsWithoutRef<"div"> & {
  continueLink?: string;
  showLogin?: boolean;
  back?: boolean;
};

export function SignupForm({
  className,
  continueLink,
  showLogin = false,
  back = false,
  ...props
}: FormProps) {
  const searchParams = useSearchParams();
  const searchParamsAsString = searchParams.toString();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setError] = useState<boolean>(false);
  // const [username, setUsername] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const signIn = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            role: "user",
            // username,
          },
        },
      });
      const user = data.user;
      if (error) setError(true);
      if (back) router.back();
      else {
        const urlToOnboarding = `/onboarding${searchParamsAsString ? `?${searchParamsAsString}` : ""}`;
        router.push(urlToOnboarding);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <form>
        <div className="grid gap-6">
          <div className="grid gap-6">
            {/* <div className="grid gap-2">
              <Label htmlFor="nickname">Имя пользователя</Label>
              <Input
                id="nickname"
                type="text"
                placeholder="yz13"
                required
                className="bg-background/60 h-10 text-base"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div> */}
            <div className="grid gap-2">
              <Label htmlFor="email">Почта</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="bg-background/60 h-10 text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Пароль</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="bg-background/60 h-10 text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {hasError && (
              <span className="text-xs text-error-foreground">
                Ошибка, проверьте правильно ли введены почта и/или пароль
              </span>
            )}
            <div className="flex flex-row items-center justify-end gap-2">
              {showLogin && (
                <Button variant="ghost" className="w-fit gap-2" asChild>
                  <Link
                    href={
                      searchParamsAsString
                        ? `/login?${searchParamsAsString}`
                        : "/login"
                    }
                  >
                    Уже есть аккаунт
                  </Link>
                </Button>
              )}
              <Button
                onClick={signIn}
                type="submit"
                disabled={
                  isLoading || email.length === 0 || password.length === 0
                }
                className="w-fit gap-2"
              >
                {isLoading && (
                  <Loader2Icon className="animate-spin" size={18} />
                )}
                Продолжить
              </Button>
            </div>
          </div>
        </div>
      </form>
      <div className="text-balance py-6 text-xs text-muted-foreground">
        Нажимая на «Продолжить», вы соглашаетесь с нашими{" "}
        <Link href="#" className="text-foreground">
          Условиями использования
        </Link>{" "}
        и{" "}
        <Link href="#" className="text-foreground">
          Политикой конфиденциальности
        </Link>
        .
      </div>
    </div>
  );
}
