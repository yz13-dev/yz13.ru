import { Logo } from "@/components/logo"
import Link from "next/link"

const page = () => {
  return (
    <div className="w-full h-dvh flex items-center justify-center gap-2">
      <Link href="/">
        <Logo className="size-12 absolute top-6 left-6" />
      </Link>
      <div className="flex items-center h-16 gap-2 justify-center">
        <div className="size-12 hover:bg-yz-neutral-100 hover:size-16 hover:border-foreground transition-all rounded-lg border"></div>
        <div className="size-12 hover:bg-yz-neutral-100 hover:size-16 hover:border-foreground transition-all rounded-lg border"></div>
        <div className="size-12 hover:bg-yz-neutral-100 hover:size-16 hover:border-foreground transition-all rounded-lg border"></div>
        <div className="size-12 hover:bg-yz-neutral-100 hover:size-16 hover:border-foreground transition-all rounded-lg border"></div>
      </div>
    </div>
  )
}
export default page
