import { ClockIcon } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { PiGithubLogoDuotone, PiTelegramLogoDuotone, PiTwitterLogoDuotone } from "react-icons/pi"
const LiveTime = dynamic(() => import("./workspace/live-time"), {
  ssr: false,
  loading: () => <span className="text-sm inline-block text-secondary">13:00</span>
})

const SocialsBlock = () => {
  return (
    <ul className="w-fit rounded-xl border h-fit p-1 flex flex-row gap-1">
      <li className="p-2 space-y-2 rounded-lg bg-yz-neutral-100 hover:bg-yz-neutral-200 cursor-pointer border border-transparent hover:border-yz-neutral-300">
        <ClockIcon size={18} />
        <LiveTime className="inline-block" />
      </li>
      <Link href="https://github.com/YZ13-ENV" target="_blank">
        <li className="p-2 space-y-2 rounded-lg bg-yz-neutral-100 hover:bg-yz-neutral-200 cursor-pointer border border-transparent hover:border-yz-neutral-300">
          <PiGithubLogoDuotone size={18} />
          <span className="text-sm inline-flex items-center gap-2">YZ13-ENV</span>
        </li>
      </Link>
      <Link href="https://t.me/YZTHECEO" target="_blank">
        <li className="p-2 space-y-2 rounded-lg bg-yz-neutral-100 hover:bg-yz-neutral-200 cursor-pointer border border-transparent hover:border-yz-neutral-300">
          <PiTelegramLogoDuotone size={18} />
          <span className="text-sm inline-flex items-center gap-2">YZTHECEO</span>
        </li>
      </Link>
      <Link href="https://twitter.com/YZ13_DEV" target="_blank">
        <li className="p-2 space-y-2 rounded-lg bg-yz-neutral-100 hover:bg-yz-neutral-200 cursor-pointer border border-transparent hover:border-yz-neutral-300">
          <PiTwitterLogoDuotone size={18} />
          <span className="text-sm inline-flex items-center gap-2">YZ13_DEV</span>
        </li>
      </Link>
    </ul>
  )
}

export default SocialsBlock