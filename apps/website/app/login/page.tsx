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
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-pixel"
        >
          <Logo className="size-8 relative" />
          <span className="text-lg">YZ13</span>
        </Link>
        <LoginForm continueLink={continueLink} />
      </div>
    </div>
  );
};
export default page;
