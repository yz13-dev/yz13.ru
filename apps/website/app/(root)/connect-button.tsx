import { HandwrittenStrikethrough } from "@/components/handwritten-strikethrough";
import UnderlinedText from "@/components/handwritten-underline";
import { get } from "@vercel/edge-config";
import Link from "next/link";

const ConnectButton = async () => {
  const isBusy = await get<boolean>("busy");
  if (isBusy)
    return (
      <HandwrittenStrikethrough
        segments={30}
        textClassName="text-secondary text-xl font-medium"
      >
        Связаться.
      </HandwrittenStrikethrough>
    );
  return (
    <UnderlinedText>
      <Link
        href="/contact-me"
        className="text-foreground text-xl font-medium w-fit inline"
      >
        Связаться.
      </Link>
    </UnderlinedText>
  );
};

export default ConnectButton;
