import AutoScroll from "@/components/auto-scroll";
import GithubContributions from "@/components/github-contributions";
import LogoSvg from "@/components/logo-svg";
import { ExternalLinkIcon } from "@yz13/ui/icons";
import Link from "next/link";
import CommandBlock from "./components/command-block";



export default function Terminal() {
  return (
    <div className="w-full divide-y">
      <AutoScroll />
      <CommandBlock command="/whoami">
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
            Проект был построен на базе Next.js, а также использовал TailwindCSS для создания компонентов и стилей. Но позднее было решено перейти на Vite + ReactRouter.
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

    </div>
  )
}
