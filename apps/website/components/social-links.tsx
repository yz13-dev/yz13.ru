import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import {
  PiGithubLogo,
  PiMailbox,
  PiTelegramLogo,
  PiXLogo,
} from "react-icons/pi";

export const links = [
  {
    name: "GitHub",
    href: "https://github.com/yz13-dev",
    icon: PiGithubLogo,
  },
  {
    name: "Telegram",
    href: "https://t.me/yz13_dev",
    icon: PiTelegramLogo,
  },
  {
    name: "X",
    href: "https://x.com/YZ13_DEV",
    icon: PiXLogo,
  },
  {
    name: "Mail",
    href: "mailto:YZTHECEO@yandex.ru",
    icon: PiMailbox,
  },
];

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-2">
      {
        links
          .map((link) => (
            <Link
              key={link.href}
              target="_blank"
              href={link.href}
              className="group relative"
            >
              <link.icon
                size={16}
                className="text-muted-foreground hover:text-foreground transition-colors"
              />
              <span className="sr-only">{link.name}</span>
              <ArrowDownIcon className="hidden group-hover:block absolute size-4 bottom-5 animate-bounce" />
            </Link>
          ))
      }
    </div>
  );
};

export default SocialLinks;
