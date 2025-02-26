import { Typewriter } from "@/components/text-writter";
import { get } from "@vercel/edge-config";
import SocialLinks from "./social-links";

type AvailabilityProps = {};

const availableTexts = ["Открыт для заказов", "Закажите какой-нибудь проект"];
const unavailableTexts = [
  "Работаю над заказами",
  "Есть пара заказов",
  "Делаю вид что работаю",
];

const Availability = async ({}: AvailabilityProps) => {
  const isBusy = await get<boolean>("busy");
  const status: "available" | "unavailable" = isBusy
    ? "unavailable"
    : "available";

  const text = status === "available" ? availableTexts : unavailableTexts;
  return (
    <div className="w-full flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="size-2 relative">
          <div className="absolute inset-0 size-2 animate-ping bg-red-foreground rounded-full" />
          <div className="size-2 animate-pulse bg-red-foreground rounded-full" />
        </div>
        <div className="flex items-center gap-1">
          <Typewriter
            text={text}
            speed={100}
            loop={true}
            className="text-sm text-secondary"
          />
        </div>
      </div>
      <SocialLinks />
    </div>
  );
};

export default Availability;
