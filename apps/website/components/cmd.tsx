"use client"
import { type Project, projects } from "@yz13/registries"
import { filter } from "@yz13/registries/utils/filter"
import { Button, ButtonProps } from "@yz13/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, } from "@yz13/ui/command"
import { GlobeIcon, LinkIcon } from "@yz13/ui/icons"
import { Kbd } from "@yz13/ui/kbd"
import { useRouter } from "next/navigation"
import { useHotkeys } from "react-hotkeys-hook"
import { create } from "zustand"

type State = {
  open: boolean
}
type Actions = {
  setOpen: (open: boolean) => void
}

const useCmdStore = create<State & Actions>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}))


export function Cmd() {

  const open = useCmdStore(state => state.open)
  const setOpen = useCmdStore(state => state.setOpen)
  const router = useRouter();

  const allProjects = filter<Project>(projects, project => project.type === "project" && !!project.url)
  const allWorks = filter<Project>(projects, project => project.type === "work" && !!project.url)

  const moveTo = (href: string) => {
    router.push(href)
    setOpen(false)
  }

  useHotkeys("esc", () => {
    setOpen(false);
  }, { enabled: open })
  useHotkeys("ctrl+k,cmd+k", () => {
    setOpen(!open)
  }, { preventDefault: true, enabled: true })
  if (!open) return null
  return (
    <div
      className="w-full h-dvh p-10 flex flex-col md:justify-center justify-end items-center fixed z-30 inset-0 bg-background/20 backdrop-blur-md"
      onClick={() => setOpen(false)}
    >
      <Command
        className="sm:max-w-sm max-w-full h-fit border outline-6 outline-border/40"
        onClick={e => {
          e.preventDefault()
        }}
      >
        <CommandInput
          placeholder="Напишите команду..."
          autoFocus
          onKeyDown={e => {
            if (e.key === "Escape") setOpen(false);
          }}
        />
        <CommandList>
          <CommandEmpty>Комманд не найдено.</CommandEmpty>
          <CommandGroup heading="Навигация">
            <CommandItem
              onSelect={() => moveTo("/")}
            >
              <LinkIcon />
              <span>Главная</span>
            </CommandItem>
            <CommandItem
              onSelect={() => moveTo("/projects")}
            >
              <LinkIcon />
              <span>Проекты</span>
            </CommandItem>
            <CommandItem
              onSelect={() => moveTo("/works")}
            >
              <LinkIcon />
              <span>Работы</span>
            </CommandItem>
          </CommandGroup>
          {
            !!allProjects.length &&
            <>
              <CommandSeparator />
              <CommandGroup heading="Проекты">
                {
                  allProjects
                    .map(project => (
                      <CommandItem
                        key={`cmd/${project.id}`}
                        value={project.id}
                        onSelect={id => {
                          const item = projects.find(project => project.id === id)
                          if (item && item.url) moveTo(item.url)
                        }}
                      >
                        <GlobeIcon />
                        <span>{project.name}</span>
                      </CommandItem>
                    ))
                }
              </CommandGroup>
            </>
          }
          {
            !!allWorks.length &&
            <>
              <CommandSeparator />
              <CommandGroup heading="Работы">
                {
                  allWorks.
                    map(project => (
                      <CommandItem key={`cmd/${project.id}`}
                        onSelect={id => {
                          const item = projects.find(project => project.id === id)
                          if (item) {
                            const type = `${item.type}s`
                            moveTo(`/${type}/${item.id}`)
                          }
                        }}
                      >
                        <GlobeIcon />
                        <span>{project.name}</span>
                      </CommandItem>
                    ))
                }
              </CommandGroup>
            </>
          }
        </CommandList>
        <CommandSeparator />
        <div className="w-full h-8 px-2 flex items-center justify-between">
          <div className="flex h-full items-center gap-1">
            <Kbd>Esc</Kbd>
            <span className="text-xs text-muted-foreground">Закрыть</span>
          </div>
          <div className="flex h-full items-center gap-1">
            <Kbd>Enter</Kbd>
            <span className="text-xs text-muted-foreground">Выбрать</span>
          </div>
        </div>
      </Command>
    </div>
  )
}

export const CmdTrigger = ({ className = "", children, ...props }: ButtonProps) => {
  const setOpen = useCmdStore(state => state.setOpen)
  return (
    <Button
      className={className}
      onClick={() => setOpen(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter") setOpen(true)
      }}
      {...props}
    >
      {children}
    </Button>
  )
}
