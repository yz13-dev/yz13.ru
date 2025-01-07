"use client";
import { Loader2Icon } from "lucide-react";
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

type LoginFormProps = ComponentPropsWithoutRef<"div"> & {
  continueLink?: string;
};

export function LoginForm({
  className,
  continueLink,
  ...props
}: LoginFormProps) {
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
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login to your account to continue
            {/* with your Github or Google account */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              {/* <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full gap-2">
                  <PiGithubLogoBold size={18} />
                  Login with Github
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <PiGoogleLogoBold size={18} />
                  Login with Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div> */}
              <div className="grid gap-6">
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
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
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
                    <Loader2Icon className="animate-spin" size={18} />
                  )}
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign up
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
