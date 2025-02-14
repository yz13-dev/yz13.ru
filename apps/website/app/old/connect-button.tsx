import { HandwrittenStrikethrough } from "@/components/handwritten-strikethrough";
import UnderlinedText from "@/components/handwritten-underline";
import { get } from "@vercel/edge-config";
import Link from "next/link";
import { cn } from "yz13/cn";

const ConnectButton = async ({ className = "" }: { className?: string }) => {
  const isBusy = await get<boolean>("busy");
  if (isBusy)
    return (
      <HandwrittenStrikethrough
        segments={30}
        textClassName={cn("text-secondary text-xl font-medium", className)}
      >
        Связаться.
      </HandwrittenStrikethrough>
    );
  return (
    <UnderlinedText>
      <Link
        href="/contact-me"
        className={cn("text-foreground text-xl font-medium w-fit", className)}
      >
        Связаться.
      </Link>
    </UnderlinedText>
  );
};

export default ConnectButton;
