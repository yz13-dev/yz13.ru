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

type LoginFormProps = ComponentPropsWithoutRef<"div"> & {
  continueLink?: string;
  showSignUp?: boolean;
  back?: boolean;
};

export function LoginForm({
  className,
  continueLink,
  showSignUp = false,
  back = false,
  ...props
}: LoginFormProps) {
  const searchParams = useSearchParams();
  const searchParamsAsString = searchParams.toString();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setError] = useState<boolean>(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const signIn = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      const user = data.user;
      const backLink = continueLink
        ? `${continueLink}?${searchParamsAsString}`
        : "/";
      if (error) setError(true);
      if (user) {
        if (back) router.back();
        else router.push(backLink);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col space-y-12 h-fit", className)} {...props}>
      <form>
        <div className="grid gap-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Почта</Label>
              <Input
                autoComplete="email"
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
                {false && (
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Забыли пароль?
                  </a>
                )}
              </div>
              <Input
                autoComplete="current-password"
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
              {showSignUp && (
                <Button variant="ghost" className="w-fit gap-2" asChild>
                  <Link
                    href={
                      searchParamsAsString
                        ? `/signup?${searchParamsAsString}`
                        : "/signup"
                    }
                    className="underline-offset-4 text-foreground"
                  >
                    Создать аккаунт
                  </Link>
                </Button>
              )}
              <Button
                onClick={signIn}
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
      <div className="text-balance text-start text-xs text-muted-foreground">
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
