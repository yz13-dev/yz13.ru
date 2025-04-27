import { HeartIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="md:p-[2.5%] p-[5%] calendar-container flex flex-row justify-between gap-6 w-full">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          Calendar Made with
        </span>
        <HeartIcon size={16} />
        <span className="text-xs text-muted-foreground">by</span>
        <Link
          href="https://yz13.ru"
          className="text-xs hover:underline text-muted-foreground"
        >
          YZ13
        </Link>
      </div>
      <span className="text-xs text-muted-foreground">2025</span>
    </footer>
  );
}
