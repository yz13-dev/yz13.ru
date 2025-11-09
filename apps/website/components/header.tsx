import { Button } from "@yz13/ui/button";
import { cn } from "@yz13/ui/cn";
import { ArchiveIcon, EllipsisIcon } from "@yz13/ui/icons";
import Link from "next/link";
import { ThemeImage } from "./theme-image";



export default function Header() {
  return (
    <header
      className={cn(
        "flex items-center justify-between gap-4 mx-auto",
        "*:py-4 h-[68px]"
      )}
    >
      <div className="pl-6 py-4">
        <div className="h-10 flex items-center">
          <Link href="/" className="lg:block hidden">
            <ThemeImage
              className="max-h-10 w-fit"
              srcDark="/logo/dark-full.png"
              srcLight="/logo/light-full.png"
              width={250}
              height={40}
              alt="logo"
            />
          </Link>
          <Link href="/" className="lg:hidden block">
            <ThemeImage
              className="max-h-10 w-fit"
              srcDark="/logo/dark.png"
              srcLight="/logo/light.png"
              width={40}
              height={40}
              alt="logo"
            />
          </Link>
        </div>
      </div>
      <nav
        className={cn(
          "pr-6 flex items-center gap-3",
          "[&>button]:h-10 [&>button]:text-base",
          "[&>a]:h-10 [&>a]:text-base",
        )}
      >
        <div className={cn(
          "md:flex hidden items-center gap-1",
          "[&>button]:h-10 [&>button]:text-base",
          "[&>a]:h-10 [&>a]:text-base",
        )}
        >
          <Button variant="outline" asChild>
            <Link href="/projects">
              <ArchiveIcon />
              <span className="lg:inline hidden">Проекты</span>
            </Link>
          </Button>
        </div>
        <Button variant="default">Связаться</Button>
        <Button variant="outline"><EllipsisIcon /></Button>
      </nav>
    </header>
  )
}
