import terminal, { Args, Context, parseArg, parseShortArg } from "./terminal";

export const terminalApi = {
  output: (data: string) => {},
  parse: (data: string) => {
    const [packageId, command, ...args] = data.split(" ");
    let validArgs: Args[] = [];
    args.forEach((arg) => {
      if (arg[0] === "-" && !arg.startsWith("--")) {
        const parsedArg = parseArg(arg);
        if (parsedArg) validArgs.push(parsedArg);
      }
      if (arg.startsWith("--")) {
        const parsedArg = parseShortArg(arg);
        if (parsedArg) validArgs.push(parsedArg);
      }
    });
    if (!packageId || !command) return;
    return { packageId, command, args: validArgs };
  },
  executePackageCommand: (
    ctx: Context,
    packageId: string,
    command: string,
    args: Args[]
  ) => {
    const targetPackage =
      terminal.packages[packageId as keyof typeof terminal.packages];
    if (!targetPackage) return;
    const targetCommand = targetPackage.commands.find(
      (item) => item.name === command
    );
    if (!targetCommand) return;
    const trigger = `${packageId} ${command} ${args.map((item) => item.value).join(" ")}`;
    targetCommand.execute(ctx, trigger, args);
  },
};
