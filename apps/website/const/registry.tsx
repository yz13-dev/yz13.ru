import LogoSvg from "@/components/logo-svg";
import { randomId } from "@/utils/random-id";
import Link from "next/link";


export type CommandContent = {
  description: string;
  content: React.ReactNode
  as?: keyof HTMLElementTagNameMap
}

export type Command = {
  id: string;
  command: string;
} & CommandContent;

export const commands: Map<string, CommandContent> = new Map();

commands
  .set("/logo", {
    description: "Выводит логотип проекта.",
    content: <LogoSvg className="max-w-2xs" />
  })

commands
  .set("/info", {
    as: "main",
    description: "Выводит информацию о проекте.",
    content: <>
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

export const getCommands = () => {

  const cmds: Command[] = [];

  const keys = commands.keys();
  const id = randomId();

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

  return cmds;
}
