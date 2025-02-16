import { Logo } from "@/components/logo";
import { cookies } from "next/headers";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { cn } from "yz13/cn";
import { createClient } from "yz13/supabase/server";
import { LoginForm } from "./login-form";

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
    <div className="w-full h-dvh divide-y border-b flex flex-col items-center justify-center">
      <div className="w-full h-fit">
        <div className="grid-template max-w-screen-xl h-full w-full mx-auto border-x border-y">
          <div className="w-full h-full pattern-lines" />
          <div
            className={cn(
              "w-full my-auto border-x max-h-dvh",
              "md:!divide-x divide-x-0 md:!divide-y-0 divide-y",
              "grid md:!grid-cols-2 grid-cols-1 md:!grid-rows-1 grid-rows-2",
            )}
          >
            <div className="w-full h-full p-6 flex flex-col gap-4 justify-start">
              <Link href="/">
                <Logo size={{ width: 56, height: 56 }} type="only-icon" />
              </Link>
              <h1 className="text-4xl font-medium">Вход</h1>
              <p className="text-base text-secondary">
                Используйте свой аккаунт
              </p>
            </div>
            <LoginForm className="w-full h-full" continueLink={continueLink} />
          </div>
          <div className="w-full h-full pattern-lines" />
        </div>
      </div>
    </div>
  );
};
export default page;
