import AutoScroll from "@/components/auto-scroll";
import CommandBlock from "@/components/command-block";
import CommandHistory from "@/components/command-history";
import CommandInputBlock from "@/components/command-input-block";
import GithubContributions from "@/components/github-contributions";
import LogoSvg from "@/components/logo-svg";
import { CmdHistoryProvider } from "@/stores/cmd-history.store";
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/avatar";
import { ExternalLinkIcon, MailIcon } from "@yz13/ui/icons";
import { InputGroupButton } from "@yz13/ui/input-group";
import Link from "next/link";



export default function Terminal() {
  return (
    <CmdHistoryProvider>
      <header className="w-full h-10 border-b sticky top-0 bg-background z-10 py-2 px-6">
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <InputGroupButton variant="secondary">Терминал</InputGroupButton>
            {/*<InputGroupButton variant="ghost">Работы</InputGroupButton>*/}
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/yz13-dev.png" alt="yz13-dev" />
              <AvatarFallback>YZ13</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <CommandBlock command="whoami">
        <span className="text-sm block">yz13</span>
      </CommandBlock>
      <CommandBlock command="/logo">
        <LogoSvg className="max-w-2xs" />
      </CommandBlock>
      <CommandBlock command="/info" as="main">
        <h1 className="text-sm block">yz13 - фронтенд разработчик</h1>
        <p className="text-sm block">Нужен разработчик? Разработаю фронтенд для вашего проекта.</p>

        <ul className="text-sm *:py-1 *:list-disc *:list-inside">
          <li>
            <span>Фронтенд разработчик</span>
          </li>
          <li>
            <Link href="mailto:yz13.dev@gmail.com" className="hover:underline">yz13.dev@gmail.com</Link>
          </li>
          <li>
            <Link href="https://yz13.ru" target="_blank" className="hover:underline">yz13.ru</Link>
          </li>
        </ul>
      </CommandBlock>
      <CommandBlock command="/work">

        <span className="text-sm block">Reservia [09.2024 — 11.2025] (1 год 3 месяца)</span>

        <div className="py-2 space-y-2">
          <span className="text-sm block text-muted-foreground">
            Надо было начать разработку быстро, поэтому было решено начать с shadcn и  tailwindcss. По началу проект был написан на NextJS, но позднее было решено перейти на Vite + ReactRouter.
          </span>

          <span className="text-sm block text-muted-foreground">
            В рамках проекта были выполнены и разработаны следующие функции:
          </span>
        </div>

        <ul className="text-sm *:py-1 *:list-disc *:list-inside text-muted-foreground">
          <li><span>Редактор карты заведений.</span></li>
          <li><span>Разработка и написание фронта.</span></li>
          <li><span>Фикс багов и оптимизация кода.</span></li>
          <li><span>Подключение к API сервиса и работа с ним.</span></li>
        </ul>

        <ul className="flex text-sm text-muted-foreground items-start flex-wrap gap-1">
          <li><span>[ Next.js ]</span></li>
          <li><span>[ TailwindCSS ]</span></li>
          <li><span>[ Typescript ]</span></li>
          <li><span>[ ReactRouter ]</span></li>
          <li><span>[ Vite ]</span></li>
        </ul>

      </CommandBlock>

      <CommandBlock command="/socials">
        <ul className="text-sm *:py-1 *:list-disc *:list-inside">
          <li>
            <Link href="https://t.me/yz13_dev" target="_blank" className="inline-flex hover:cursor-pointer items-center gap-1 hover:underline">
              <span>telegram</span><ExternalLinkIcon size={14} />
            </Link>
          </li>
          <li>
            <Link href="https://github.com/yz13-dev" target="_blank" className="inline-flex hover:cursor-pointer items-center gap-1 hover:underline">
              <span>github</span><ExternalLinkIcon size={14} />
            </Link>
          </li>
          <li>
            <Link href="https://x.com/yz13_dev" target="_blank" className="inline-flex hover:cursor-pointer items-center gap-1 hover:underline">
              <span>x</span><ExternalLinkIcon size={14} />
            </Link>
          </li>
          <li>
            <Link href="mailto:yz13.dev@gmail.com" target="_blank" className="inline-flex hover:cursor-pointer items-center gap-1 hover:underline">
              <span>email</span>
              <MailIcon size={14} />
            </Link>
          </li>
        </ul>
      </CommandBlock>

      <CommandBlock command="/contributions">
        <GithubContributions username="yz13-dev" />
      </CommandBlock>

      <CommandBlock command="/projects">

        <ul className="text-sm *:py-1 *:list-disc *:list-inside">
          <li>
            <Link href="https://yzlab.ru" target="_blank" className="inline-flex hover:cursor-pointer items-center gap-1 hover:underline">
              <span>yzlab</span><ExternalLinkIcon size={14} />
            </Link>
          </li>
          <li><span>Блог</span></li>
          <li><span>Пины</span></li>
          <li><span>Link</span></li>
          <li><span>Новостная лента</span></li>
        </ul>

      </CommandBlock>

      <div className="w-full px-6 py-2 border-b">
        <span className="text-xs text-muted-foreground">
          Последняя сессия - 10:00 13.08.2025
        </span>
      </div>

      <CommandHistory />

      <CommandInputBlock />
      <AutoScroll />
    </CmdHistoryProvider>
  )
}
