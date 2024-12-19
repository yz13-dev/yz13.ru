import { getOutput, pushOutput } from "./output.store";

type Package = {
  name: string;
  description: string;
  id: string; // package executes by id, yz13 --command--
  commands: Command[];
};
type Command = {
  name: string;
  description: string;
  command: string;
  args: Args[];
  execute(ctx: Context, commang: string, args: Args[]): Promise<void>;
};

type Arg = {
  [key: string]: string;
};
type ShortArg = {
  [key: string]: boolean;
};

export type Args = Arg | ShortArg;

export type OutputRecord = {
  data: string;
  type: "log" | "error";
  trigger: string;
  timestamp: number;
  proccess: string;
};

export const parseArg = (arg: string) => {
  const [key, value] = arg.split("=");
  if (!key || !value) return {};
  return { [key]: value };
};
export const parseShortArg = (arg: string) => {
  const isStartWithDashes = arg.startsWith("--");
  if (!isStartWithDashes) return {};
  const key = arg.replaceAll("--", "");
  return { [key]: true };
};

export const generateProcessId = () =>
  Math.random().toString(36).substring(2, 15);

export class Context {
  output: OutputRecord[] = [];
  constructor() {
    this.output = getOutput();
  }
  init(history: OutputRecord[]) {
    this.output = history;
  }
  log(data: OutputRecord) {
    pushOutput(data);
  }
}

const systemPackage: Package = {
  name: "System package",
  description: "Just system package",
  id: "system",
  commands: [
    {
      name: "version",
      description: "Show version",
      command: "version",
      args: [],
      execute: async (ctx, cmd) => {
        ctx.log({
          trigger: cmd,
          proccess: generateProcessId(),
          data: "0.0.1",
          type: "log",
          timestamp: Date.now(),
        });
      },
    },
  ],
};

export default {
  packages: {
    system: systemPackage,
  },
};
