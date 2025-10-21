"use client";

import { Logo } from "@/app/components/logo";
import { validateEmail } from "@/app/utils/email";
import { postAuthV1Login } from "@yz13/api";
import type { GetStoreV1Id200 } from "@yz13/api/types";
import { Button } from "@yz13/ui/button";
import { Input } from "@yz13/ui/input";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useMemo, useState } from "react";

export default function ({ app }: { app?: GetStoreV1Id200 }) {
  const [next] = useQueryState("next");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const disabled = useMemo(() => {
    const shortPassword = password.length < 6;
    const invalidEmail = !validateEmail(email);
    return loading || !email || !password || shortPassword || invalidEmail;
  }, [email, password, loading]);

  const login = async () => {
    setLoading(true);
    try {
      const result = await postAuthV1Login({
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
    <div className="w-full h-dvh relative flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full h-fit border bg-background flex md:flex-row flex-col rounded-4xl">
        <div className="md:w-1/2 w-full md:h-full h-fit pt-20 relative">
          <div className="flex items-start gap-1 absolute top-6 left-6">
            <Logo size={48} type="icon" className="size-12" />

            {app && (
              <div className="size-9 relative flex items-center justify-center">
                <span>X</span>
              </div>
            )}

            {app && (
              <div className="size-14 -top-3 relative">
                <Logo type="icon" />
              </div>
            )}
          </div>
          <div className="px-6 pb-6 h-full space-y-2">
            <h1 className="text-3xl font-semibold block">
              Вход {app ? `в ${app.name}` : null}
            </h1>
            <p className="text-lg block text-muted-foreground">
              Используйте аккаунт YZ13.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 w-full md:h-full h-fit pt-20 relative">
          <div className="px-6 pb-6 h-full gap-4 flex flex-col justify-between">
            <Input
              placeholder="example@yz13.ru"
              className="h-10 text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="******"
              className="h-10 text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="w-full"></div>
            <div className="flex items-center justify-end gap-3">
              {!loading && (
                <Button variant="ghost" asChild>
                  <Link href="/auth/signup">Создать аккаунт</Link>
                </Button>
              )}
              <Button disabled={disabled} onClick={login}>
                {loading && <Loader2Icon className="animate-spin" />}Продолжить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
