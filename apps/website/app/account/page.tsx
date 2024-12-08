import { Logo } from "@/components/logo"
import { PaintRollerIcon, ShieldAlertIcon, UserCircleIcon } from "lucide-react"
import { Button } from "mono/components/button"
import { Skeleton } from "mono/components/skeleton"
import Link from "next/link"
import { Suspense } from "react"
import User from "../../components/user"



const page = () => {
  return (
    <div className="p-8 max-w-screen-xl mx-auto w-full space-y-8 h-fit">
      <header className="w-full h-fit flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-7 w-20" type="full" />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Suspense fallback={<Skeleton className="size-8 rounded-full" />}>
            <User size="sm" />
          </Suspense>
        </div>
      </header>
      <div className="flex w-full h-fit gap-6">
        <aside className="w-56 h-fit">
          <Button className="w-full gap-1.5 justify-start" variant="default">
            <UserCircleIcon size={16} />
            <span>Profile</span>
          </Button>
          <Button className="w-full gap-1.5 justify-start" variant="ghost">
            <PaintRollerIcon size={16} />
            <span>Appearence</span>
          </Button>
          <Button className="w-full gap-1.5 justify-start" variant="ghost">
            <ShieldAlertIcon size={16} />
            <span>Danger zone</span>
          </Button>
        </aside>
        <main className="w-[calc(100%-20rem)] p-2 space-y-12 h-fit">
          <div className="flex items-center gap-4">
            <div className="size-9 rounded-lg border"></div>
            <span className="text-xl font-bold">@example.com</span>
          </div>
          <section className="flex flex-col gap-6">
            <p className="text-sm">Profile picture</p>
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full border" />
              <Button variant="secondary" size="sm">Change</Button>
              <Button variant="destructive" size="sm">Delete</Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default page
