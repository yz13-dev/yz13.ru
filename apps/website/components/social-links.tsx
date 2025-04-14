import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import {
  PiGithubLogo,
  PiMailbox,
  PiTelegramLogo,
  PiXLogo,
} from "react-icons/pi";

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-2">
      <Link
        target="_blank"
        href="mailto:YZTHECEO@yandex.ru"
        className="group relative"
      >
        <PiMailbox
          size={16}
          className="text-muted-foreground hover:text-foreground transition-colors"
        />
        <ArrowDownIcon className="hidden group-hover:block absolute size-4 bottom-5 animate-bounce" />
      </Link>
      <Link
        target="_blank"
        href="https://github.com/yz13-dev"
        className="group relative"
      >
        <PiGithubLogo
          size={16}
          className="text-muted-foreground hover:text-foreground transition-colors"
        />
        <ArrowDownIcon className="hidden group-hover:block absolute size-4 bottom-5 animate-bounce" />
      </Link>
      <Link
        target="_blank"
        href="https://x.com/YZ13_DEV"
        className="group relative"
      >
        <PiXLogo
          size={16}
          className="text-muted-foreground hover:text-foreground transition-colors"
        />
        <ArrowDownIcon className="hidden group-hover:block absolute size-4 bottom-5 animate-bounce" />
      </Link>
      <Link
        target="_blank"
        href="https://t.me/yz13_dev"
        className="group relative"
      >
        <PiTelegramLogo
          size={16}
          className="text-muted-foreground hover:text-foreground transition-colors"
        />
        <ArrowDownIcon className="hidden group-hover:block absolute size-4 bottom-5 animate-bounce" />
      </Link>
    </div>
  );
};

export default SocialLinks;
