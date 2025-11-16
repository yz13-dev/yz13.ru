import { github, telegram, x } from "@/const/socials";
import { getAvailability } from "@/flags";
import { Button } from "@yz13/ui/button";
import { DrawerClose, DrawerDescription, DrawerTitle } from "@yz13/ui/drawer";
import { ExternalLinkIcon, XIcon } from "@yz13/ui/icons";
import Link from "next/link";
import { Suspense } from "react";
import Availability, { AvailabilitySkeleton } from "./availability";
import { ThemeImage } from "./theme-image";
import { ThemeSwitcher } from "./theme-switcher";



export default async function ExtraMenu() {

  const isAvailable = await getAvailability();

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <ThemeImage
          className="max-h-10 w-fit"
          srcDark="/logo/dark.png"
          srcLight="/logo/light.png"
          width={40}
          height={40}
          alt="logo"
        />
        <div className="flex items-center gap-2">
          <Button variant="default" disabled={!isAvailable}>Связаться</Button>
          <DrawerClose asChild>
            <Button variant="outline"><XIcon /></Button>
          </DrawerClose>
        </div>
      </div>
      <div className="pt-6 *:text-2xl *:text-foreground *:font-medium *:block space-x-2">
        <DrawerTitle>Нужен разработчик?</DrawerTitle>
        <DrawerDescription>Разработаю фронтенд для вашего проекта.</DrawerDescription>
      </div>
      <div className="py-6 flex items-center justify-between">
        <Suspense fallback={<AvailabilitySkeleton className="h-10" type="full" />}>
          <Availability textType="full" className="h-10 justify-start w-fit text-base" />
        </Suspense>
        <ThemeSwitcher />
      </div>
      <div className="w-full grid grid-cols-1 gap-4">
        <div>
          <div className="py-2">
            <span className="text-base text-muted-foreground uppercase">yz13</span>
          </div>
          <ul className="*:py-1">
            <li><Link href="/" className="text-lg hover:underline">Главная</Link></li>
            <li className="space-x-1.5">
              <Link href="/projects" className="text-lg hover:underline">Проекты</Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/works" className="text-lg hover:underline">Работы</Link>
            </li>
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
    </>
  )
}
