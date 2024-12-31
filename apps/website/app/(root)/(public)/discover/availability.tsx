const LiveTime = dynamic(() => import("@/components/live/live-time"), {
  ssr: false,
});
import { ClockIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { PiGithubLogo, PiTelegramLogo, PiXLogo } from "react-icons/pi";

const Availability = () => {
  return (
    <div className="w-full flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="size-1.5 rounded-full animate-pulse bg-success-foreground" />
          <span className="text-sm text-secondary">Available for work</span>
        </div>
        <span className="text-sm text-secondary">/</span>
        <div className="flex items-center gap-1">
          <ClockIcon size={12} className="text-secondary" />
          <LiveTime className="text-secondary" />
          <span className="text-sm text-secondary">UTC +5</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link target="_blank" href="https://github.com/yz13-env">
          <PiGithubLogo
            size={16}
            className="text-secondary hover:text-foreground transition-colors"
          />
        </Link>
        <Link target="_blank" href="https://x.com/YZ13_DEV">
          <PiXLogo
            size={16}
            className="text-secondary hover:text-foreground transition-colors"
          />
        </Link>
        <Link target="_blank" href="https://t.me/yztheceo">
          <PiTelegramLogo
            size={16}
            className="text-secondary hover:text-foreground transition-colors"
          />
        </Link>
      </div>
    </div>
  );
};

export default Availability;
