"use client"
import { User } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "yz13/supabase/client"


const UserContext = createContext<{ user: User | undefined }>({ user: undefined })

export const useUser = () => {
  const { user } = useContext(UserContext)
  if (!UserContext) throw new Error("useUser must be used within a UserProvider")
  return user
}

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined)

  console.log("user", user)

  const client = createClient()
  useEffect(() => {
    client.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user)
      }
    })
  }, [])

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}