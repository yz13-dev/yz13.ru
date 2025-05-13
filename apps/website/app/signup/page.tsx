import { Logo } from "@/components/logo";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { getPublication } from "rest-api/store";
import { cn } from "yz13/cn";
import Background from "../(root)/components/background";
import { SignupForm } from "./signup-form";

type Props = {
  searchParams: Promise<{
    lang?: string;
    appId?: string;
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
  const app = await getAppById(appId);
  const appName = app?.name;
  const continueLink = searchParams.continue;
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
            <h1 className="text-3xl font-medium">Создать аккаунт</h1>
            <p className="text-base text-muted-foreground">
              Введите свой адрес электронной почты и пароль
            </p>
            {app && (
              <span className="text-base text-muted-foreground">
                После авторизации вас перенаправят обратно в {appName}
              </span>
            )}
          </div>
        </div>
        <SignupForm
          className="w-full h-full"
          continueLink={continueLink}
          showLogin
        />
      </div>
    </div>
  );
};
export default page;
