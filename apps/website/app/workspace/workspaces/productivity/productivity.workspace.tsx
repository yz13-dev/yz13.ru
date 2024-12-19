"use server"
import { getUserWorkspaces } from "@/actions/workspace/by-user/action"
import { Button } from "mono/components/button"
import { Checkbox } from "mono/components/checkbox"
import { cookies } from "next/headers"
import Link from "next/link"
import { createClient } from "yz13/supabase/server"
import { productivityWorkspace } from "../../const/workspaces"



const ProductivityWorkspace = async () => {
  const worskace = productivityWorkspace
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  const workspaces = user ? await getUserWorkspaces(user.id) : []
  const current = workspaces[0]
  if (!user) return (
    <div className="max-w-sm mx-auto p-8 w-full h-dvh">
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
        <span className="text-center">
          This is a personal workspace,
          after login you can create your own
        </span>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/login/email">
              Sign in
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
  return (
    <div className="max-w-screen-md mx-auto p-8 w-full min-h-[calc(100dvh-70px)]">
      <div className="mt-20 w-full h-full space-y-8">
        <h1 className="text-4xl font-semibold">{current?.name}</h1>
        <div className="w-full h-full space-y-4">
          <div className="w-full h-11 rounded-xl border px-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Checkbox className="size-6 rounded-lg" />
              <span className="text-base font-medium text-foreground/80">Task something</span>
            </div>
            <div className="flex items-center gap-2">

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductivityWorkspace