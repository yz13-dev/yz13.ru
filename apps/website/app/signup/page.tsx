import { Logo } from "@/components/logo";
import Link from "next/link";
import { cn } from "yz13/cn";
import { SignupForm } from "./signup-form";
import { Suspense } from "react";
import { Skeleton } from "mono/components/skeleton";
import Background from "../(root)/background";

type Props = {
  searchParams: Promise<{
    lang?: string;
    continue?: string;
  }>;
};
const page = async (props: Props) => {
  const searchParams = await props.searchParams;
  const continueLink = searchParams.continue;
  const loginLink =
    "/login" + (continueLink ? `?continue=${continueLink}` : "");

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
      <div className={cn("w-full max-w-2xl md:px-[2.5%] px-[5%] mx-auto z-20")}>
        <div className="w-full h-fit py-6 flex flex-col gap-4 justify-start">
          <h1 className="text-4xl font-medium">Создать аккаунт</h1>
          <p className="text-base text-secondary">
            Введите свой адрес электронной почты и пароль
          </p>
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
