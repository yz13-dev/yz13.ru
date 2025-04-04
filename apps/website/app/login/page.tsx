import { Logo } from "@/components/logo";
import { cookies } from "next/headers";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { cn } from "yz13/cn";
import { createClient } from "yz13/supabase/server";
import { LoginForm } from "./login-form";
import { Suspense } from "react";
import { Skeleton } from "mono/components/skeleton";
import Background from "../new-root/background";

type Props = {
  params: Promise<{}>;
  searchParams: Promise<{
    lang?: string;
    continue?: string;
  }>;
};
const page = async (props: Props) => {
  const searchParams = await props.searchParams;
  const cks = await cookies();
  const sp = createClient(cks);
  const {
    data: { user },
  } = await sp.auth.getUser();
  const continueLink = searchParams.continue;
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
      <Link href="/" className="absolute top-6 left-6">
        <Logo size={{ width: 128, height: 24 }} type="full" />
      </Link>
      <div className={cn("w-full max-w-2xl mx-auto z-20")}>
        <div className="w-full h-fit py-6 flex flex-col gap-4 justify-start">
          <h1 className="text-4xl font-medium">Вход</h1>
          <p className="text-base text-secondary">Используйте свой аккаунт</p>
        </div>
        <LoginForm
          className="w-full h-full"
          continueLink={continueLink}
          showSignUp
        />
      </div>
    </div>
  );
};
export default page;
