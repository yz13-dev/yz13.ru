import { Logo } from "@/components/logo"
import { Skeleton } from "mono/components/skeleton"
import { Suspense } from "react"
import User from "./user"




const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-12 w-full">
      {children}
    </div>
  )
}

type HeaderProps = {
  info?: React.ReactNode
  actions?: React.ReactNode
}
const Header = ({ actions, info }: HeaderProps) => {
  return (
    <header className="px-8 pt-8 max-w-screen-2xl mx-auto w-full h-fit flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Logo className="size-7" />
          <span className="text-2xl font-pixel">YZ13</span>
        </div>
        {info}
        <Suspense fallback={<Skeleton className="size-8 rounded-full" />}>
          <User />
        </Suspense>
      </div>
      <div className="flex items-center gap-2">
        {actions}
      </div>
    </header>
  )
}

export const Workspace = {
  Header,
  Wrapper,
}

export { Header, Wrapper }
