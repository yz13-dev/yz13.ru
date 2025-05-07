import { Logo } from "@/components/logo";
import { Skeleton } from "mono/components/skeleton";
import { cookies } from "next/headers";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { Suspense } from "react";
import { getPublication } from "rest-api/store";
import { cn } from "yz13/cn";
import { createClient } from "yz13/supabase/server";
import Background from "../(root)/background";
import { LoginForm } from "./login-form";

type Props = {
  params: Promise<{}>;
  searchParams: Promise<{
    appId?: string;
    lang?: string;
    continue?: string;
  }>;
};

const getAppById = async (appId?: string) => {
  if (!appId) return null;
  const { data: app } = await getPublication(appId);
  return app;
};

const page = async (props: Props) => {
  const searchParams = await props.searchParams;
  const appId = searchParams.appId;
  const cks = await cookies();
  const sp = createClient(cks);
  const {
    data: { user },
  } = await sp.auth.getUser();
  const app = await getAppById(appId);
  const continueLink = searchParams.continue;
  const appName = app?.name;
  if (user) return permanentRedirect(continueLink || "/");
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center">
      <Suspense
        fallback={
          <Skeleton className="w-full h-dvh absolute top-0 left-0 rounded-none" />
        }
      >
        <Background />
      </Suspense>
      <div
        className={cn(
          "w-full max-w-4xl rounded-3xl border bg-background/90 mx-auto z-20",
          "*:p-6 grid md:grid-cols-2 grid-cols-1 *:w-full *:h-full divide-x",
        )}
      >
        <div className="space-y-4">
          <div className="w-fit">
            <Link href="/">
              <Logo size={{ width: 128, height: 24 }} type="full" />
            </Link>
          </div>
          <div className="w-full h-fit flex flex-col gap-2 justify-start">
            <h1 className="text-3xl font-medium">
              Вход {appName ? `в ${appName}` : ""}
            </h1>
            <p className="text-base text-muted-foreground">
              Используйте свой аккаунт
            </p>
            {app && (
              <span className="text-base text-muted-foreground">
                После авторизации вас перенаправят обратно в {appName}
              </span>
            )}
          </div>
        </div>
        <LoginForm
          className="w-full h-fit"
          continueLink={continueLink}
          showSignUp
        />
      </div>
    </div>
  );
};
export default page;
