"use client";
import { Command, getCommands } from "@/const/registry";
import { CmdHistoryContext } from "@/stores/cmd-history.store";
import { randomId } from "@/utils/random-id";
import { version } from "@/utils/version";
import { Badge } from "@yz13/ui/badge";
import { ArrowDownIcon, ArrowUpIcon } from "@yz13/ui/icons";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@yz13/ui/input-group";
import { Kbd } from "@yz13/ui/kbd";
import { useContext, useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { create, useStore } from "zustand";

type State = {
  text: string
  selectedCommand: Command | null;
}
type Actions = {
  setText: (text: string) => void
  setSelectedCommand: (cmd: Command | null) => void
}

export const useCommandInputStore = create<State & Actions>()((set) => ({
  text: "",
  selectedCommand: null,
  setText: (text) => set({ text }),
  setSelectedCommand: (selectedCommand) => set({ selectedCommand })
}))

export const CommandListPopover = () => {

  const ref = useRef<HTMLDivElement>(null)

  const text = useCommandInputStore((state) => state.text);
  const isSelected = useCommandInputStore((state) => state.selectedCommand);
  const setSelectedCommand = useCommandInputStore((state) => state.setSelectedCommand)

  const [activeIndex, setActiveIndex] = useState(0);

  const isSpecificCommand = text.startsWith("/");
  const isCommandList = text === "/";

  const list = getCommands(text);

  const nextCommand = () => {
    if (list.length - 1 === activeIndex) return;
    setActiveIndex(prev => prev + 1);
  }

  const prevCommand = () => {
    if (activeIndex === 0) return;
    setActiveIndex(prev => prev - 1);
  }

  const lockScroll = () => {
    const doc = document.documentElement;

    doc.classList.add("overflow-hidden")
  }
  const unlockScroll = () => {
    const doc = document.documentElement;

    doc.classList.remove("overflow-hidden");
  }

  const returnToInput = () => {
    const commandInput = document.getElementById("command-input");
    if (!commandInput) return;
    commandInput.focus();
  }

  useHotkeys("esc", () => {
    returnToInput();
  }, { enabled: isSpecificCommand })
  useHotkeys("arrowup", () => {
    prevCommand();
  }, { enabled: isSpecificCommand })
  useHotkeys("arrowdown", () => {
    nextCommand();
  }, { enabled: isSpecificCommand })
  useEffect(() => {
    if (isSelected) {
      unlockScroll();

      if (text.length === 0) setSelectedCommand(null);

      return;
    }
    if (isCommandList) {

      const div = ref.current;

      const commandInput = document.getElementById("command-input");

      if (!div) return;
      if (!commandInput) return;

      lockScroll()
      commandInput.blur();

    } else if (isSpecificCommand) {
      return
    }
    else unlockScroll();
  }, [isCommandList, isSelected, text, isSpecificCommand]);
  if (isSelected) return null;
  if (!isSpecificCommand) return null;
  return (
    <div ref={ref} className="p-2 absolute bottom-full max-w-lg w-full">
      <div className="bg-card py-2 space-y-2 border rounded-xl *:w-full w-full">
        <div className="px-2">
          <ul className="[&>li>button]:w-full [&>li>button]:justify-start">
            {
              list.map((command, index) => {

                const isActive = index === activeIndex;

                return (
                  <li key={command.command}>
                    <CommandButton command={command} active={isActive} />
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="px-2">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Kbd><ArrowUpIcon /></Kbd>
                <span className="text-xs text-muted-foreground">Вверх</span>
              </div>
              <div className="flex items-center gap-1">
                <Kbd><ArrowDownIcon /></Kbd>
                <span className="text-xs text-muted-foreground">Вниз</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Kbd>Esc</Kbd>
                <span className="text-xs text-muted-foreground">Вернуться к вводу</span>
              </div>
              <div className="flex items-center gap-1">
                <Kbd>Enter</Kbd>
                <span className="text-xs text-muted-foreground">Выбрать команду</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const CommandButton = ({
  command,
  active = false
}: {
  active?: boolean
  command: Command
}) => {

  const setSelectedCommand = useCommandInputStore((state) => state.setSelectedCommand)
  const setText = useCommandInputStore((state) => state.setText)

  const ref = useRef<HTMLButtonElement>(null)

  const focus = () => {

    const button = ref.current;

    if (!button) return;

    button.focus();

  }

  const blur = () => {

    const button = ref.current;

    if (!button) return;

    button.blur();

  }

  const selectCommand = (cmd: string) => {

    setText(cmd);
    setSelectedCommand({
      ...command,
      id: randomId()
    });

    const commandInput = document.getElementById("command-input");

    if (!commandInput) return;

    blur();
    commandInput.focus();

  }

  useEffect(() => {
    if (active) focus();
  }, [active])
  return (
    <InputGroupButton
      ref={ref}
      className="flex h-fit items-start flex-col"
      onKeyDown={e => {
        e.preventDefault();
        if (e.key === "Enter") selectCommand(command.command);
      }}
      onClick={() => selectCommand(command.command)}
    >
      <span>{command.command}</span>
      {
        command.description &&
        <span className="text-xs text-muted-foreground">{command.description}</span>
      }
    </InputGroupButton>
  )
}

export default function CommandInputBlock() {

  const text = useCommandInputStore((state) => state.text)
  const setText = useCommandInputStore((state) => state.setText);

  const selectedCommand = useCommandInputStore((state) => state.selectedCommand);
  const setSelectedCommand = useCommandInputStore((state) => state.setSelectedCommand);

  const scroll = () => {
    const doc = document.documentElement;

    const scrollHeight = doc.scrollHeight;
    const clientHeight = doc.clientHeight;

    if (scrollHeight > clientHeight) {
      doc.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  }


  const store = useContext(CmdHistoryContext);
  if (!store) throw new Error('Missing BearContext.Provider in the tree')
  const pushCommand = useStore(store, (s) => s.pushCommand)

  const addCommand = () => {
    if (!selectedCommand) return;

    pushCommand(selectedCommand);
    setSelectedCommand(null);

    setText("");
    setTimeout(() => {
      scroll();
    }, 25)
  }

  return (
    <>
      <div className="p-1 relative">
        <CommandListPopover />
        <InputGroup>
          <InputGroupAddon align="block-start">
            <Badge variant="secondary">yz13@yz13.ru</Badge>
            <Badge variant="secondary">v{version}</Badge>
            <Badge variant="secondary">/</Badge>
          </InputGroupAddon>
          <InputGroupTextarea
            id="command-input"
            placeholder="/ для списка комманд"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCommand();
              }
            }}
          />
          <InputGroupAddon align="block-end" className="justify-end" onClick={addCommand}>
            <InputGroupButton>
              <ArrowUpIcon />
              <span>Отправить</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </>
  )
}
