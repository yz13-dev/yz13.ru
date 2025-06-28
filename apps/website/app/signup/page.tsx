import { Logo } from "@/components/logo";
import { getV1StoreId } from "@yz13/api";
import { cn } from "@yz13/ui/cn";
import { Skeleton } from "@yz13/ui/components/skeleton";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
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
  const app = await getV1StoreId(appId);
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
              <Logo size={24} type="full" />
            </Link>
          </div>
          <div className="w-full h-fit flex flex-col gap-2 justify-start">
            <h1 className="text-3xl font-medium">Создать аккаунт</h1>
            <div className="space-x-2 *:inline">
              <p className="text-base text-muted-foreground">
                Введите свой адрес электронной почты и пароль.
              </p>
              {app && (
                <span className="text-base text-muted-foreground">
                  После авторизации вас перенаправят обратно в{" "}
                  {app.public_url ? (
                    <Link
                      href={app.public_url}
                      className="text-foreground inline-flex items-center gap-1 hover:underline font-medium"
                    >
                      {appName}
                      <ExternalLink size={18} />
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">
                      {appName}
                    </span>
                  )}
                </span>
              )}
            </div>
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
