import { Logo } from "@/components/logo"
import Link from "next/link"
import { SignupForm } from "./signup-form"

type Props = {
  searchParams: Promise<{
    lang?: string
    continue?: string
  }>
}
const page = async (props: Props) => {
  const searchParams = await props.searchParams;
  const continueLink = searchParams.continue
  const loginLink = "/login" + (continueLink ? `?continue=${continueLink}` : "")
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
        <SignupForm />
      </div>
    </div>
  );
}
export default page
