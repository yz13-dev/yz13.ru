"use client";
import { Command } from '@/const/registry';
import { createContext, useContext, useRef } from 'react';
import { createStore, useStore } from 'zustand';

interface CmdHistoryProps {
  commands: Command[]
}

interface CmdHistoryState extends CmdHistoryProps {
  setCommands: (commands: Command[]) => void
  pushCommand: (command: Command) => void
}

type CmdHistoryStore = ReturnType<typeof createCmdHistoryStore>

const createCmdHistoryStore = (initProps?: Partial<CmdHistoryProps>) => {
  const DEFAULT_PROPS: CmdHistoryProps = {
    commands: [],
  }
  return createStore<CmdHistoryState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setCommands: (commands) => set({ commands }),
    pushCommand: (command) => set((state) => ({
      commands: [...state.commands, command]
    })),
  }))
}


export const CmdHistoryContext = createContext<CmdHistoryStore | null>(null)

export const CmdHistoryProvider = ({
  children,
  props
}: {
  children: React.ReactNode,
  props?: CmdHistoryProps
}) => {
  const store = useRef(createCmdHistoryStore(props)).current

  return (
    <CmdHistoryContext.Provider value={store}>
      {children}
    </CmdHistoryContext.Provider>
  )
}

export const useCmdHistory = () => {
  const store = useContext(CmdHistoryContext);
  if (!store) throw new Error('Missing BearContext.Provider in the tree')
  const commands = useStore(store, (s) => s.commands)
  return commands;
}
