import GithubContributions from "@/components/github-contributions";
import LogoSvg from "@/components/logo-svg";
import { randomId } from "@/utils/random-id";
import { Button } from "@yz13/ui/button";
import { ExternalLinkIcon, MailIcon } from "@yz13/ui/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export type CommandContent = {
  description: string;
  content: () => React.ReactNode
  as?: keyof HTMLElementTagNameMap
}

export type Command = {
  id: string;
  command: string;
} & CommandContent;

export const commands: Map<string, CommandContent> = new Map();

export type Commands = "/logo" | "/info" | "/work" | "/socials" | "/contributions" | "/projects" | "/actions";

commands
  .set("/logo", {
    description: "Выводит логотип проекта.",
    content: () => <LogoSvg className="max-w-2xs" />
  })

commands
  .set("/info", {
    as: "main",
    description: "Выводит информацию о проекте.",
    content: () => <>
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
    </>
  })

commands
  .set("/work", {
    description: "Выводит информацию об опыте работы.",
    content: () => <>
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

    </>
  })

commands
  .set("/socials", {
    description: "Выводит ссылки на социальные сети.",
    content: () => <ul className="text-sm *:py-1 *:list-disc *:list-inside">
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
  })

commands
  .set("/contributions", {
    description: "Выводит активность на GitHub.",
    content: () => <GithubContributions username="yz13-dev" />
  })

commands
  .set("/profile", {
    description: "Переход на страницу работ.",
    content: () => {

      const router = useRouter();
      useEffect(() => {
        router.push("/profile");
      }, [])
      return null
    }
  })

commands
  .set("/actions", {
    description: "Выводит активность на GitHub.",
    content: () => <div className="flex items-center gap-4 *:px-0">
      <Button variant="link" disabled>Чат</Button>
      <Button variant="link" disabled>Запланировать видеозвонок</Button>
    </div>
  })

export const getCommand = (cmd?: string): Command | null => {
  if (!cmd) return null
  const command = commands.get(cmd);

  if (!command) return null;

  return {
    ...command,
    id: randomId(),
    command: cmd
  }
};

export const getCommands = (cmd?: string) => {

  const cmds: Command[] = [];

  const keys = commands.keys();
  // const id = randomId();

  for (const key of keys) {
    const command = commands.get(key);
    if (!command) {
      continue;
    }

    cmds.push({
      command: key,
      id: key,
      ...command
    });

  }

  return cmds.filter(item => {
    if (!cmd) return true;
    return item.command.startsWith(cmd);
  })
}
