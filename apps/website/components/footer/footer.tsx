import { cn } from "@yz13/ui/cn";
import Link from "next/link";
import { Logo } from "../logo";
import { links } from "../social-links";

const Footer = ({ className = "" }: { className?: string }) => {
  return (
    <footer className={cn("w-full h-fit *:p-6 grid grid-cols-1 md:grid-cols-2", className)}>
      <div className="">
        <div className="space-y-3">
          <span className="block text-muted-foreground">
            Социальные сети
          </span>
          <ul>
            {
              links.map((link) => (
                <li key={link.href} className="h-8 items-center">
                  <Link
                    target="_blank"
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <link.icon
                      size={16}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    />
                    <span className="text-sm">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className="flex items-start justify-end">
        <Logo size={36} />
      </div>
    </footer>
  );
};
export default Footer;
