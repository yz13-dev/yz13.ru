"use client"
import { createClient } from "@yz13/supabase/client"
import { cn } from "@yz13/ui/cn"
import { useRouter } from "next/navigation"
import { getURL } from "./get-url"

type Props = {
  continue?: string
  children?: React.ReactNode
}
const GoogleButton = ({ continue: continueLink = "", children }: Props) => {
  const router = useRouter()
  const signInWithGoogle = async () => {
    const continue_flow = continueLink ? `?continue=${continueLink}` : ""
    const sp = createClient()
    const { data, error } = await sp.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getURL() + "/auth/callback" + continue_flow
      }
    })
    if (data.url) router.push(data.url)
  }
  return (
    <button
      onClick={signInWithGoogle}
      className={cn(
        "flex items-center justify-center w-full h-12 gap-2 font-medium rounded-xl bg-foreground hover:bg-foreground/70 text-background",
        "hover:bg-foreground/90"
      )}
    >
      {children}
    </button>
  )
}
export { GoogleButton }
