import { ExternalLinkIcon } from "@yz13/ui/icons";
import Link from "next/link";
import { ThemeImage } from "./theme-image";

const telegram = "https://t.me/yz13_dev";
const github = "https://github.com/yz13-dev";
const x = "https://x.com/yz13_dev";

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
              <li><Link href="/" className="text-lg hover:underline">Главная</Link></li>
              <li><Link href="/projects" className="text-lg hover:underline">Проекты</Link></li>
              <li><Link href="/blog" className="text-lg hover:underline">Блог</Link></li>
            </ul>
          </div>
          {
            false &&
            <div>
              <div className="py-2">
                <span className="text-base text-muted-foreground uppercase">ресурсы</span>
              </div>
              <ul className="*:py-1">
                <li><span className="text-lg">...</span></li>
                <li><span className="text-lg">...</span></li>
              </ul>
            </div>
          }

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
