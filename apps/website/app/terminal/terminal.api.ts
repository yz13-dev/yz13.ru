import {
  CommandOutput,
  CommandOutputEntry,
  getTerminalState,
  ParsedInput,
  setTerminalState,
  TerminalState,
} from "./terminal";

export const terminal = {
  parseInput: (input: string): ParsedInput => {
    // Регулярное выражение для обработки аргументов с кавычками
    const regex = /(".*?"|'.*?'|\S+)/g;
    const matches = input.match(regex) || [];

    const rawArgs = matches.map((arg) =>
      arg.startsWith('"') || arg.startsWith("'")
        ? arg.slice(1, -1) // Удаляем кавычки
        : arg
    );

    // Проверяем структуру ввода
    let packageName = "";
    let command = "";

    if (rawArgs.length === 1) {
      // Если одна команда без пакета, интерпретируем как системную
      command = rawArgs.shift() || "";
    } else {
      // Если два и более слова, интерпретируем как <package> <command>
      packageName = rawArgs.shift() || "";
      command = rawArgs.shift() || "";
    }

    // Разделение аргументов и флагов
    const args: string[] = [];
    const options: Record<string, string | boolean> = {};

    rawArgs.forEach((arg) => {
      if (arg.startsWith("--")) {
        // Длинные флаги (--key=value или --key)
        const [key, value] = arg.slice(2).split("=");
        if (!key) return; // Если ключ не указан
        options[key] = value ?? true; // true, если значение не указано
      } else if (arg.startsWith("-")) {
        // Короткие флаги (-k=value или -k)
        const [key, value] = arg.slice(1).split("=");
        if (!key) return; // Если ключ не указан
        options[key] = value ?? true;
      } else {
        // Обычные аргументы
        args.push(arg);
      }
    });

    return { packageName, command, args, options, raw: input };
  },
};
function generateUniqueId() {
  return Math.random().toString(36).substring(2, 10); // Простая генерация ID
}
type ExecArgs = {
  state: TerminalState;
  input: ParsedInput;
  resolve: (output: CommandOutputEntry) => void;
};
function createHistoryEntry(command: string): CommandOutputEntry {
  return {
    id: generateUniqueId(),
    command,
    output: [],
    timestamp: Date.now(),
    endTimestamp: null,
    status: "pending",
  };
}
const createProccess = (output: CommandOutputEntry): void => {
  const state = getTerminalState();
  const history = state.history;
  history.push(output);
  setTerminalState({ ...state, history });
};
const updateProccess = (output: CommandOutputEntry): void => {
  const state = getTerminalState();
  const history = state.history;
  const item = history.find((item) => item.id === output.id);
  if (item) {
    const updated = history.map((item) => {
      if (item.id === output.id) {
        return output;
      } else {
        return item;
      }
    });
    setTerminalState({ ...state, history: updated });
  }
};

export function executeCommand(props: ExecArgs) {
  const { input, state, resolve } = props;
  const entry = createHistoryEntry(input.raw);
  try {
    const systemCommand = state.systemCommands[input.command];
    if (systemCommand) {
      if (systemCommand.isAsync) return executeAsyncCommand(props);
      else {
        createProccess(entry);
        entry.output = systemCommand.execute(
          input.args,
          state
        ) as CommandOutput[];
      }
    } else {
      const packageName = input.packageName;
      const commandName = input.command;
      if (!packageName) return;
      const packageCommands = state.commands[packageName];
      const command = packageCommands?.find((cmd) => cmd.name === commandName);

      if (command) {
        if (command.isAsync) return executeAsyncCommand(props);
        else {
          createProccess(entry);
          entry.output = command.execute(input.args, state) as CommandOutput[];
          updateProccess(entry);
        }
      } else {
        createProccess(entry);
        entry.output = [
          { type: "stderr", message: `Command "${input.command}" not found.` },
        ];
        entry.status = "error";
        updateProccess(entry);
      }
    }

    entry.status = "completed";
    entry.endTimestamp = Date.now();
    updateProccess(entry);
  } catch (err) {
    entry.output = [
      {
        type: "stderr",
        message: `Error: ${err instanceof Error ? err.message : err}`,
      },
    ];
    entry.status = "error";
    entry.endTimestamp = Date.now();
    updateProccess(entry);
  }
}

async function executeAsyncCommand(props: ExecArgs) {
  const { input, state, resolve } = props;
  const entry = createHistoryEntry(input.raw);

  try {
    const packageName = input.packageName;
    const commandName = input.command;
    if (!packageName) return;
    const packageCommands = state.commands[packageName];
    const command = packageCommands?.find((cmd) => cmd.name === commandName);

    if (command) {
      createProccess(entry);
      entry.output = await command.execute(input.args, state); // Асинхронное выполнение
      updateProccess(entry);
    } else {
      createProccess(entry);
      entry.output = [
        { type: "stderr", message: `Command "${input.command}" not found.` },
      ];
      entry.status = "error";
      updateProccess(entry);
    }

    entry.status = "completed";
    entry.endTimestamp = Date.now();
    updateProccess(entry);
  } catch (err) {
    entry.output = [
      {
        type: "stderr",
        message: `Error: ${err instanceof Error ? err.message : err}`,
      },
    ];
    entry.status = "error";
    entry.endTimestamp = Date.now();
    updateProccess(entry);
  }
}
