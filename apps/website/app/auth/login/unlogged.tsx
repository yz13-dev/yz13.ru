import { Separator } from "@yz13/mono/components/separator"
import Link from "next/link"
import { GithubButton } from "./github-button"
import { GoogleButton } from "./google-button"

type Props = {
  continue?: string
}
const UnLogged = async ({ continue: continueLink }: Props) => {
  const signUpLink = "/signup" + (continueLink ? `?continue=${continueLink}` : "")
  const emailLoginLink = "/login/email" + (continueLink ? `?continue=${continueLink}` : "")
  return (
    <>
      <h1 className="text-4xl font-bold">Title</h1>
      <div className="flex flex-col w-full max-w-sm gap-3 px-6 py-12 mx-auto">
        <GithubButton continue={continueLink}>
          Github
        </GithubButton>
        <GoogleButton continue={continueLink}>
          Google
        </GoogleButton>
        <Separator />
        <Link
          href={emailLoginLink}
          className="flex items-center justify-center w-full h-12 gap-2 font-medium rounded-xl disabled:opacity-60"
        >
          Email
        </Link>
      </div>
    </>
  )
}
export { UnLogged }
