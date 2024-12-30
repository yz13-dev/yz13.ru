import { ClockIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  PiGithubLogoDuotone,
  PiTelegramLogoDuotone,
  PiTwitterLogoDuotone,
} from "react-icons/pi";
const LiveTime = dynamic(() => import("@/app/workspace/live-time"), {
  ssr: false,
  loading: () => (
    <span className="text-sm inline-block text-secondary">13:00</span>
  ),
});

const SocialsBlock = () => {
  return (
    <ul className="w-fit rounded-xl border h-fit p-1 flex flex-row gap-1 *:min-w-16 *:relative">
      <li className="p-2 space-y-2 rounded-lg bg-background hover:bg-yz-neutral-200 cursor-pointer border border-transparent hover:border-yz-neutral-300">
        <ClockIcon size={18} />
        <LiveTime className="inline-block" />
      </li>
      <li className="p-2 space-y-2 rounded-lg bg-background hover:bg-yz-neutral-200 cursor-pointer border border-transparent hover:border-yz-neutral-300">
        <PiGithubLogoDuotone size={18} />
        <span className="text-sm inline-flex items-center gap-2">YZ13-ENV</span>
        <Link
          href="https://github.com/YZ13-ENV"
          target="_blank"
          className="absolute left-0 top-0 w-full h-full"
        />
      </li>
      <li className="p-2 space-y-2 rounded-lg bg-background hover:bg-yz-neutral-200 cursor-pointer border border-transparent hover:border-yz-neutral-300">
        <PiTelegramLogoDuotone size={18} />
        <span className="text-sm inline-flex items-center gap-2">YZTHECEO</span>
        <Link
          href="https://t.me/YZTHECEO"
          target="_blank"
          className="absolute left-0 top-0 w-full h-full"
        />
      </li>
      <li className="p-2 space-y-2 rounded-lg bg-background hover:bg-yz-neutral-200 cursor-pointer border border-transparent hover:border-yz-neutral-300">
        <PiTwitterLogoDuotone size={18} />
        <span className="text-sm inline-flex items-center gap-2">YZ13_DEV</span>
        <Link
          href="https://twitter.com/YZ13_DEV"
          target="_blank"
          className="absolute left-0 top-0 w-full h-full"
        />
      </li>
    </ul>
  );
};

export default SocialsBlock;
