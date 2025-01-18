import Link from "next/link";
import {
  PiGithubLogo,
  PiMailbox,
  PiTelegramLogo,
  PiXLogo,
} from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="w-full !mt-24 flex flex-col items-center gap-y-6 px-6">
      <div className="w-full flex items-center justify-between">
        <span className="text-xs text-secondary">© 2024 YZ13.</span>
        <div className="flex flex-row gap-2">
          <Link target="_blank" href="mailto:YZTHECEO@yandex.ru">
            <PiMailbox
              size={16}
              className="text-secondary hover:text-foreground transition-colors"
            />
          </Link>
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
    </footer>
  );
};

export default Footer;
