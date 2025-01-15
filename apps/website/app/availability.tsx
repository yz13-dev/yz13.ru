const LiveTime = dynamic(() => import("@/components/live/live-time"), {
  ssr: false,
});
import { get } from "@vercel/edge-config";
import dynamic from "next/dynamic";
import Link from "next/link";
import { PiGithubLogo, PiTelegramLogo, PiXLogo } from "react-icons/pi";
import { cn } from "yz13/cn";

type AvailabilityProps = {};

const Availability = async ({}: AvailabilityProps) => {
  const busy = (await get("busy")) ?? false;
  const status: "available" | "unavailable" = busy
    ? "unavailable"
    : "available";
  return (
    <div className="w-full flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div
            className={cn(
              "size-1.5 rounded-full animate-pulse",
              status === "available"
                ? "bg-success-foreground"
                : "bg-error-foreground",
            )}
          />
          <span className="text-sm text-secondary">
            {status === "available"
              ? "Открыт для заказов"
              : "Работаю над заказами"}
          </span>
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
        <Link target="_blank" href="https://t.me/yz13_dev">
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
