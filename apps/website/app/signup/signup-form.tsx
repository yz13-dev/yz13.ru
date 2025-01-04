"use client";
import { LoaderIcon } from "lucide-react";
import { Button } from "mono/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "mono/components/card";
import { Input } from "mono/components/input";
import { Label } from "mono/components/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef, useState } from "react";
import { cn } from "yz13/cn";
import { createClient } from "yz13/supabase/client";

type FormProps = ComponentPropsWithoutRef<"div"> & {
  continueLink?: string;
};

export function SignupForm({ className, continueLink, ...props }: FormProps) {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setError] = useState<boolean>(false);
  const [nickname, setNickname] = useState("");
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
            nickname: nickname,
          },
        },
      });
      const user = data.user;
      if (error) setError(true);
      if (user) router.push(continueLink || "/");
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome in YZ13</CardTitle>
          <CardDescription>Create new account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="nickname">Nickname</Label>
                  <Input
                    id="nickname"
                    type="text"
                    placeholder="yz13"
                    required
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {hasError && (
                  <span className="text-xs text-error-foreground">
                    Ошибка, проверьте правильно ли введены почта и/или пароль
                  </span>
                )}
                <Button
                  onClick={signIn}
                  type="submit"
                  disabled={
                    isLoading || email.length === 0 || password.length === 0
                  }
                  className="w-full gap-2"
                >
                  {isLoading && (
                    <LoaderIcon className="animate-spin" size={18} />
                  )}
                  Sign up
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
