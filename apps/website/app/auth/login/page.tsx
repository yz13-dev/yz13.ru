import { cookies } from "next/headers"
import Image from "next/image"
import { createClient } from "yz13/supabase/server"
import { Logged } from "./logged"
import { UnLogged } from "./unlogged"

type Props = {
  params: {}
  searchParams: {
    lang?: string
    continue?: string
  }
}
const page = async ({ searchParams, params }: Props) => {
  const cks = cookies()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const isLogged = !!user
  const continueLink = searchParams.continue
  return (
    <div className="max-w-3xl w-full mx-auto h-screen">
      <div className="w-full absolute top-0 left-0 flex justify-center p-6">
        <div className="size-12 relative">
          <Image className="light-mode-image" src="https://yzstatic.yz13.space/logo/yz-light.svg" fill alt="image" />
          <Image className="dark-mode-image" src="https://yzstatic.yz13.space/logo/yz-dark.svg" fill alt="image" />
        </div>
      </div>
      <div className="flex relative flex-col items-center h-full justify-center w-full">
        {
          isLogged
            ? <Logged user={user} continue={continueLink} />
            : <UnLogged continue={continueLink} />
        }
      </div>
    </div>
  )
}
export default page