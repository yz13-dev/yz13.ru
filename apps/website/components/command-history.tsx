"use client";

import { CmdHistoryContext } from "@/stores/cmd-history.store";
import { useContext } from "react";
import { useStore } from "zustand";
import CommandBlock from "./command-block";



export default function CommandHistory() {

  const store = useContext(CmdHistoryContext);
  if (!store) throw new Error('Missing BearContext.Provider in the tree')
  const commands = useStore(store, (s) => s.commands)

  return commands.map((command) => {

    return (
      <CommandBlock command={command.command} key={command.id} as={command.as}>
        {command.content}
      </CommandBlock>
    )
  })
}
