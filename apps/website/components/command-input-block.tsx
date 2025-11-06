"use client";
import { Command, getCommands } from "@/const/registry";
import { CmdHistoryContext } from "@/stores/cmd-history.store";
import { randomId } from "@/utils/random-id";
import { version } from "@/utils/version";
import { Badge } from "@yz13/ui/badge";
import { ArrowUpIcon } from "@yz13/ui/icons";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@yz13/ui/input-group";
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

  const [activeIndex, setActiveIndex] = useState(0);

  const isCommandList = text.startsWith("/");

  const list = getCommands();

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

  useHotkeys("arrowup", () => {
    prevCommand();
  }, { enabled: isCommandList })
  useHotkeys("arrowdown", () => {
    nextCommand();
  }, { enabled: isCommandList })
  useEffect(() => {
    if (isSelected) {
      unlockScroll();
      return;
    }
    if (isCommandList) {

      const div = ref.current;

      const commandInput = document.getElementById("command-input");

      if (!div) return;
      if (!commandInput) return;

      lockScroll()
      commandInput.blur();

    } else unlockScroll();
  }, [isCommandList, isSelected]);
  if (isSelected) return null;
  if (!isCommandList) return null;
  return (
    <div ref={ref} className="p-2 absolute bottom-full max-w-96 w-full">
      <div className="bg-card border rounded-xl p-2 *:w-full w-full">
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
