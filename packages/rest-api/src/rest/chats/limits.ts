"use server"
import { customFetch } from "@/const/fetch"


export const getChatLimits = async (uid: string) => {
  return await customFetch<{ chats: number }>(`/limits/chats/${uid}`, {
    method: "GET",
  })
}
