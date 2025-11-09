import { ExternalLinkIcon } from "@yz13/ui/icons";
import Link from "next/link";
import { ThemeImage } from "./theme-image";


export default function Footer() {
  return (
    <footer className="container py-12 mx-auto px-6 w-full">
      <div className="w-full flex md:flex-row gap-10 flex-col">
        <div className="max-w-sm flex flex-col gap-8">
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
        </div>
        <div className="w-full grid md:grid-cols-3 grid-cols-2 gap-4">
          <div>
            <div className="py-2">
              <span className="text-base text-muted-foreground uppercase">yz13</span>
            </div>
            <ul className="*:py-1">
              <li><Link href="/" className="text-lg">Главная</Link></li>
              <li><Link href="/projects" className="text-lg">Проекты</Link></li>
              <li><Link href="/blog" className="text-lg">Блог</Link></li>
            </ul>
          </div>
          <div>
            <div className="py-2">
              <span className="text-base text-muted-foreground uppercase">ресурсы</span>
            </div>
            <ul className="*:py-1">
              <li><span className="text-lg">...</span></li>
              <li><span className="text-lg">...</span></li>
            </ul>
          </div>
          <div>
            <div className="py-2">
              <span className="text-base text-muted-foreground uppercase">также в</span>
            </div>
            <ul className="*:py-1">
              <li>
                <span className="text-lg inline-flex items-center gap-2 hover:underline [&>svg]:size-4">
                  Telegram
                  <ExternalLinkIcon />
                </span>
              </li>
              <li>
                <span className="text-lg inline-flex items-center gap-2 hover:underline [&>svg]:size-4">
                  Github
                  <ExternalLinkIcon />
                </span>
              </li>
              <li>
                <span className="text-lg inline-flex items-center gap-2 hover:underline [&>svg]:size-4">
                  X
                  <ExternalLinkIcon />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
