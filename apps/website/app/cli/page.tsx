import AutoScroll from "@/components/auto-scroll";
import { CmdHistoryProvider } from "@/stores/cmd-history.store";
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/avatar";
import { InputGroupButton } from "@yz13/ui/input-group";
import { Skeleton } from "@yz13/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import CommandBlock from "./components/command-block";
import CommandHistory from "./components/command-history";
import CommandInputBlock from "./components/command-input-block";
import InlineCommand from "./components/inline-command";



export default function Terminal() {
  return (
    <CmdHistoryProvider>
      <header className="w-full h-10 border-b sticky top-0 bg-background z-10 py-2 px-6">
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <InputGroupButton variant="secondary">Терминал</InputGroupButton>
            <InputGroupButton variant="ghost" asChild><Link href="/profile">Профиль</Link></InputGroupButton>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/yz13-dev.png" alt="yz13-dev" />
              <AvatarFallback>YZ13</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <CommandBlock command="whoami">
        <span className="text-sm block">yz13</span>
      </CommandBlock>

      <Suspense fallback={<Skeleton className="w-full h-36" />}>
        <InlineCommand command="/logo" />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full h-36" />}>
        <InlineCommand command="/info" />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full h-36" />}>
        <InlineCommand command="/work" />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full h-36" />}>
        <InlineCommand command="/socials" />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full h-36" />}>
        <InlineCommand command="/contributions" />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full h-36" />}>
        <InlineCommand command="/projects" />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full h-36" />}>
        <InlineCommand command="/actions" />
      </Suspense>

      <div className="w-full px-6 py-2 border-b">
        <span className="text-xs text-muted-foreground">
          Последняя сессия - 10:00 13.08.2025
        </span>
      </div>

      <CommandHistory />

      <CommandInputBlock />
      <AutoScroll />
    </CmdHistoryProvider>
  )
}
