import { github, telegram, x } from "@/const/socials";
import { Badge } from "@yz13/ui/badge";
import { ExternalLinkIcon } from "@yz13/ui/icons";
import { Skeleton } from "@yz13/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import Availability, { AvailabilitySkeleton } from "./availability";
import { ThemeImage } from "./theme-image";


export default function Footer() {
  return (
    <footer className="container py-12 mx-auto px-6 w-full">
      <div className="w-full flex md:flex-row gap-10 flex-col">
        <div className="max-w-sm flex flex-col gap-10">
          <ThemeImage
            srcDark="/logo/dark.png"
            srcLight="/logo/light.png"
            width={64}
            height={64}
            alt="logo"
          />
          <span className="text-2xl font-medium">
            Нужен разработчик?
            Разработаю фронтенд для вашего проекта.
          </span>
          <Suspense fallback={<AvailabilitySkeleton className="h-10" type="full" />}>
            <Availability textType="full" className="h-10 justify-start w-fit text-base" />
          </Suspense>
        </div>
        <div className="w-full grid md:grid-cols-3 grid-cols-2 gap-4">
          <div>
            <div className="py-2">
              <span className="text-base text-muted-foreground uppercase">yz13</span>
            </div>
            <ul className="*:py-1">
              <li><Link href="/" className="text-lg hover:underline">Главная</Link></li>
              <li><Link href="/projects" className="text-lg hover:underline">Проекты</Link></li>
              <li><Link href="/blog" className="text-lg hover:underline">Блог</Link></li>
            </ul>
          </div>

          <div>
            <div className="py-2">
              <span className="text-base text-muted-foreground uppercase">мини-приложения <Badge variant="secondary">скоро</Badge></span>
            </div>
            <ul className="*:py-1">
              <li><Skeleton className="h-[23px] w-1/3" /></li>
              <li><Skeleton className="h-[23px] w-1/4" /></li>
              <li><Skeleton className="h-[23px] w-1/2" /></li>
            </ul>
          </div>

          <div>
            <div className="py-2">
              <span className="text-base text-muted-foreground uppercase">также в</span>
            </div>
            <ul className="*:py-1">
              <li className="group">
                <Link
                  href={telegram}
                  target="_blank"
                  className="text-lg inline-flex items-center gap-2 hover:underline [&>svg]:size-4"
                >
                  Telegram
                  <ExternalLinkIcon className="transition-colors text-muted-foreground group-hover:text-foreground" />
                </Link>
              </li>
              <li className="group">
                <Link
                  href={github}
                  target="_blank"
                  className="text-lg inline-flex items-center gap-2 hover:underline [&>svg]:size-4"
                >
                  Github
                  <ExternalLinkIcon className="transition-colors text-muted-foreground group-hover:text-foreground" />
                </Link>
              </li>
              <li className="group">
                <Link
                  href={x}
                  target="_blank"
                  className="text-lg inline-flex items-center gap-2 hover:underline [&>svg]:size-4"
                >
                  X
                  <ExternalLinkIcon className="transition-colors text-muted-foreground group-hover:text-foreground" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
