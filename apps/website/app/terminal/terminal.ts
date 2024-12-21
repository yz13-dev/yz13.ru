import pkg from "@/package.json";
import { create } from "zustand";
import fetchPackage from "./packages/fetch.package";
import mathPackage from "./packages/math.package";
import yz13Package from "./packages/yz13.package";

type CommandBlock = "code" | "list" | "banner";

interface Command {
  name: string; // Название команды
  description: string; // Описание команды
  isAsync?: boolean;
  block?: CommandBlock;
  execute: (
    args: string[],
    terminalState: TerminalState
  ) => CommandOutput[] | Promise<CommandOutput[]>;
}

export interface CommandOutputEntry {
  id: string; // Уникальный идентификатор команды/процесса
  command: string; // Команда, введённая пользователем
  output: CommandOutput[]; // Результат выполнения команды
  timestamp: number;
  endTimestamp: number | null;
  status: "pending" | "completed" | "error"; // Статус выполнения
  block?: CommandBlock;
}

export interface CommandOutput {
  type: "stdout" | "stderr";
  link?: string;
  message: string;
}

export interface InstalledPackage {
  name: string; // Имя пакета
  version: string; // Версия пакета
  description: string; // Описание пакета
  commands: Command[]; // Список команд, добавленных пакетом
  path: string; // Локальный путь к кэшу пакета
}
export type ParsedInput = {
  packageName: string; // Имя пакета
  command: string; // Имя команды
  args: string[]; // Обычные аргументы
  options: Record<string, string | boolean>; // Флаги
  raw: string; // Исходная строка ввода
};

export interface TerminalState {
  commands: {
    [packageName: string]: Command[];
  };
  systemCommands: Record<string, Command>; // Отдельный реестр системных команд
  history: CommandOutputEntry[]; // История команд и их вывод
}

interface PackageManagerState {
  installedPackages: InstalledPackage[]; // Установленные пакеты
  terminalState: TerminalState; // Состояние терминала
  addCommand: (packageName: string, command: Command) => void; // Добавление команды
  removeCommand: (packageName: string, commandName: string) => void; // Удаление команды
}

type State = {
  terminalState: TerminalState;
};

type Action = {
  setTerminalState: (terminalState: TerminalState) => void;
};

export const useTerminalStore = create<State & Action>()((set) => ({
  terminalState: {
    commands: {},
    systemCommands: {},
    history: [],
  },
  setTerminalState: (terminalState: TerminalState) =>
    set(() => ({ terminalState })),
}));

export const getTerminalState = () => useTerminalStore.getState().terminalState;
export const setTerminalState = (terminalState: TerminalState) =>
  useTerminalStore.setState({ terminalState });
export const pushToHistory = (entry: CommandOutputEntry) => {
  const prev = getTerminalState();
  setTerminalState({ ...prev, history: [...prev.history, entry] });
};

const packageManager: PackageManagerState = {
  installedPackages: [],
  terminalState: getTerminalState(),
  addCommand(packageName: string, command: Command) {
    registerPackage(packageName, [command]);
  },
  removeCommand(packageName: string, commandName: string) {
    if (!this.terminalState.commands[packageName]) return;
    const commands = this.terminalState.commands[packageName].filter(
      (cmd) => cmd.name !== commandName
    );
    setTerminalState({
      ...this.terminalState,
      commands: { ...this.terminalState.commands, [packageName]: commands },
    });
  },
};

// Регистрация системных команд
function registerSystemCommands() {
  const terminalState = getTerminalState();
  terminalState.systemCommands["version"] = {
    name: "version",
    description: "Displays the current version of the yz package manager",
    execute: () => [{ type: "stdout", message: pkg.version }],
  };
  terminalState.systemCommands["greeting"] = {
    name: "greeting",
    description: "Displays the greeting message",
    execute: () => [{ type: "stdout", message: "" }],
  };
  terminalState.systemCommands["help"] = {
    name: "help",
    description: "Lists all available commands",
    execute: (_, terminalState): CommandOutput[] => {
      const packagesNames = Object.keys(terminalState.commands);
      const cmds = packagesNames
        .map((pkgName) => {
          const commands = terminalState.commands[pkgName];
          if (!commands) return [];
          return commands.map((cmd) => ({
            type: "stdout",
            message: `${pkgName} ${cmd.name} - ${cmd.description}`,
          }));
        })
        .flat();

      const commands = Object.values(terminalState.systemCommands);
      const converted: CommandOutput[] = commands.map((cmd) => ({
        type: "stdout",
        message: `${cmd.name} - ${cmd.description}`,
      }));
      return [...(cmds as CommandOutput[]), ...converted];
    },
  };

  terminalState.systemCommands["list"] = {
    name: "list",
    description: "Lists all installed packages",
    execute: () => {
      const installedPackages = packageManager.installedPackages.map(
        (pkg) => `${pkg.name} (${pkg.version}) - ${pkg.description}`
      );
      return installedPackages.length
        ? installedPackages.map((pkg) => ({ type: "stdout", message: pkg }))
        : [{ type: "stdout", message: "No packages installed." }];
    },
  };
}

function registerPackage(packageName: string, packageCommands: Command[]) {
  const state = getTerminalState();
  if (!state.commands[packageName]) {
    state.commands[packageName] = [];
  }
  state.commands[packageName].push(...packageCommands);
}

registerSystemCommands();

const packages: InstalledPackage[] = [mathPackage, fetchPackage, yz13Package];

packages.forEach((pkg) => {
  const commands = pkg.commands;
  const pkgName = pkg.name;
  packageManager.installedPackages.push(pkg);
  commands.forEach((cmd) => packageManager.addCommand(pkgName, cmd));
});
