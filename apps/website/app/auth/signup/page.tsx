import { Button } from "@yz13/mono/components/button"
import { Input } from "@yz13/mono/components/input"
import Image from "next/image"
import Link from "next/link"
import { MdOpenInNew } from "react-icons/md"

type Props = {
  searchParams: {
    lang?: string
    continue?: string
  }
}
const page = async ({ searchParams }: Props) => {
  const continueLink = searchParams.continue
  const loginLink = "/login" + (continueLink ? `?continue=${continueLink}` : "")
  return (
    <div className="max-w-3xl w-full mx-auto h-screen">
      <div className="w-full absolute top-0 left-0 flex justify-center p-6">
        <div className="size-12 relative">
          <Image className="light-mode-image" src="https://yzstatic.yz13.space/logo/yz-dark.svg" fill alt="logo" />
          <Image className="dark-mode-image" src="https://yzstatic.yz13.space/logo/yz-light.svg" fill alt="logo" />
        </div>
      </div>
      <div className="flex flex-col items-center relative justify-center w-full h-screen">
        <h1 className="max-w-sm mx-auto text-4xl font-bold text-center">
          Not working
          {/* Create your YZ13&nbsp;Account */}
        </h1>
        <div className="w-full max-w-md py-12 space-y-6">
          <div className="w-full space-y-3">
            <div className="w-full space-y-1">
              <span className="text-xs text-secondary">Name</span>
              <Input placeholder="Write there" className="h-10 rounded-lg" />
            </div>
          </div>
          <Button className="w-full h-10" disabled>Continue</Button>
          <Button className="w-full" variant="ghost" asChild>
            <Link href={loginLink}>
              Already have account?
            </Link>
          </Button>
          <div className="py-6">
            <span className="text-sm inline-flex gap-1 items-center flex-wrap">
              By joining, you agree to our
              <Link href="/legal/terms" className="text-foreground inline-flex items-center gap-1 hover:underline">Terms of Service <MdOpenInNew size={14} /></Link>
              and
              <Link href="/legal/privacy-policy" className="text-foreground inline-flex items-center gap-1 hover:underline">Privacy Policy <MdOpenInNew size={14} /></Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default page