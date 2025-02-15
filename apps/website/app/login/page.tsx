import { Logo } from "@/components/logo";
import { cookies } from "next/headers";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
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
        <div className="grid-template max-w-md h-full w-full mx-auto border-x border-y">
          <div className="w-full h-full pattern-lines" />
          <div className="flex w-full my-auto border-x flex-col">
            <div className="w-full p-6 flex justify-center items-center">
              <Link
                href="/"
                className="flex items-center gap-2 self-center font-pixel"
              >
                <Logo size={{ width: 110, height: 20 }} type="full" />
              </Link>
            </div>
            <LoginForm continueLink={continueLink} />
          </div>
          <div className="w-full h-full pattern-lines" />
        </div>
      </div>
    </div>
  );
};
export default page;
