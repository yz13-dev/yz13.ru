import { cookies } from "next/headers"
import { createClient } from "yz13/supabase/server"


export const chatsLimits = {
  chats: 10
}


export const getChatsLimitsByUserId = async (uid: string) => {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { error, count } = await supabase
      .from("chats")
      .select("*", { count: "exact" })
      .eq("from_id", uid)
    if (error) {
      console.log(error)
      return (chatsLimits)
    } else {
      const chatsLeft = chatsLimits.chats - (count ?? 0)
      return ({ chats: chatsLeft })
    }
  } catch (error) {
    console.log(error)
    return (chatsLimits)
  }
}
