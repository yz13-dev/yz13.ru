"use client";
import { Logo } from "@/app/components/logo";
import { validateEmail } from "@/app/utils/email";
import { postAuthV1Register } from "@yz13/api";
import type { GetStoreV1Id200 } from "@yz13/api/types";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { Input } from "@yz13/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useMemo, useState } from "react";

export default function ({ app }: { app?: GetStoreV1Id200 }) {
  const [next] = useQueryState("next");

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const disabled = useMemo(() => {
    const shortPassword = password.length < 6;
    const invalidEmail = !validateEmail(email);
    return (
      loading ||
      !username ||
      !email ||
      !password ||
      shortPassword ||
      invalidEmail
    );
  }, [username, email, password, loading]);

  const register = async () => {
    setLoading(true);
    try {
      const result = await postAuthV1Register({
        username,
        email,
        password,
      });

      console.log(result);

      if (result) {
        if (next) {
          const isUrl = next.startsWith("http");
          if (isUrl) window.location.href = next;
          else router.push(next);
        } else router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl w-full h-fit border bg-background flex md:flex-row flex-col rounded-4xl">
      <div className="md:w-1/2 w-full md:h-full h-1/2 pt-20 relative">
        <Logo size={48} type="icon" className="size-12 absolute top-6 left-6" />
        <div className="px-6 pb-6 h-full space-y-2">
          <h1 className="text-3xl font-semibold block">Регистрация</h1>
          <p className="text-lg block text-muted-foreground">
            Вам понадобится только почта.
          </p>
        </div>
      </div>
      <div className="md:w-1/2 w-full md:h-full h-1/2 pt-20 relative">
        <div className="px-6 pb-6 h-full gap-4 flex flex-col justify-between">
          <Input
            placeholder="Имя пользователя"
            className="h-10 text-base"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="example@yz13.ru"
            className="h-10 text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="********"
            className="h-10 text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="w-full">
            <span className="text-muted-foreground text-sm">
              После регистрации вы получите доступ к{" "}
              <Link
                href="/apps"
                className="font-medium text-foreground hover:underline"
              >
                сервисам
              </Link>{" "}
              <Badge variant="secondary">YZ13</Badge>
            </span>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button variant="ghost" asChild>
              <Link href="/auth/signin">Уже есть аккаунт?</Link>
            </Button>
            <Button disabled={disabled} onClick={register}>
              Продолжить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
