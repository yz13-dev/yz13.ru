import { Button } from "@yz13/ui/button";
import { cn } from "@yz13/ui/cn";
import { ArrowRightIcon, GithubIcon } from "@yz13/ui/icons";
import Link from "next/link";
import Logo from "./logo";

export default function ({ className }: { className?: string }) {
  return (
    <div
      className={cn("w-full max-w-[1600px] mx-auto h-[120px] p-6", className)}
    >
      <div className="w-full rounded-full border px-6 py-3 bg-card">
        <header className="w-full h-12 flex items-center justify-between">
          <Link href="/">
            <Logo type="full" />
          </Link>
          <div className="flex items-center gap-3">
            <Button size="lg" variant="secondary" asChild>
              <Link href="https://github.com/yz13/links">
                <GithubIcon />
              </Link>
            </Button>
            <Button size="lg" asChild>
              <Link href="/new">
                <span>Создать ссылку</span>
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
        </header>
      </div>
    </div>
  );
}
