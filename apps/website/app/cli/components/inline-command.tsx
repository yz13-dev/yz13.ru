"use client";
import CommandBlock from "@/app/cli/components/command-block";
import { Commands, getCommand } from "@/const/registry";



export default function InlineCommand({ command }: { command?: Commands }) {

  if (!command) return null;

  const cmd = getCommand(command);

  if (!cmd) return null;

  const Content = cmd.content;
  return (
    <CommandBlock command={cmd.command} as={cmd.as}>
      <Content />
    </CommandBlock>
  )
}
