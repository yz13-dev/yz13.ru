import User, { UserSkeleton } from "@/components/user";
import { auth } from "@/lib/auth";
import { SidebarIcon } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "mono/components/sidebar";
import { notFound } from "next/navigation";
import { type ReactNode, Suspense } from "react";
import { getCalendars } from "rest-api/calendar";
import Sidebar from "./components/sidebar/sidebar";



export default async function ({ children }: { children: ReactNode }) {

  const user = await auth()

  if (!user) return notFound()

  const { data: calendars } = await getCalendars(user.id)

  return (
    <SidebarProvider>
      <Sidebar calendars={calendars ?? []} />
      <div className="w-full h-full">
        <header className="w-full h-16 border-b sticky top-0 bg-background flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden"><SidebarIcon size={18} /></SidebarTrigger>
            <h1 className="text-2xl font-bold">Настройки</h1>
          </div>
          <Suspense fallback={<UserSkeleton />}>
            <User />
          </Suspense>
        </header>
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}
