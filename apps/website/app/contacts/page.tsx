import { Logo } from "@/components/logo"
import { LockIcon } from "lucide-react"
import Link from "next/link"


const page = () => {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center">
      <Link href="/">
        <Logo className="size-12 absolute top-6 left-6" />
      </Link>
      <ul className="max-w-xs w-full rounded-xl border divide-y">
        <li className="p-3 w-full">
          <div className="w-full flex items-center gap-2">
            <div className="size-8 rounded-md border"></div>
            <div className="flex flex-col">
              <span className="text-sm">@YZTHECEO</span>
              <span className="text-xs text-secondary inline-flex items-center gap-1">
                <LockIcon size={12} />
                t.me/YZTHECEO
              </span>
            </div>
          </div>
        </li>
        <li className="p-3 w-full">
          <div className="w-full flex items-center gap-2">
            <div className="size-8 rounded-md border"></div>
            <div className="flex flex-col">
              <span className="text-sm">@YZ13_DEV</span>
              <span className="text-xs text-secondary inline-flex items-center gap-1">
                <LockIcon size={12} />
                x.com/YZ13_DEV
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
export default page
