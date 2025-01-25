import { get } from "@vercel/edge-config";
import { cn } from "yz13/cn";
import SocialLinks from "./social-links";

type AvailabilityProps = {};

const Availability = async ({}: AvailabilityProps) => {
  const isBusy = await get<boolean>("busy");
  const status: "available" | "unavailable" = isBusy
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
      <SocialLinks />
    </div>
  );
};

export default Availability;
