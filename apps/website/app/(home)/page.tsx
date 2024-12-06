import Image from "next/image"
import Dock from "./dock"
import PersonalWorkspace from "./personal-workspace"

export type SearchParams = {
  workspace?: string
  note?: string
  index?: string
}

type PageProps = {
  searchParams: SearchParams
}

const page = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const isProd = process.env.NODE_ENV === "production";
  if (isProd) return (
    <div className="w-full h-dvh flex items-center justify-center">
      <span>Realese soon</span>
    </div>
  )
  return (
    <div className="w-full h-dvh flex flex-col gap-6 items-center justify-center">
      <div className="h-16 w-56 relative">
        <Image className="light-mode-image" src="/yz-full-light.svg" fill alt="yz-logo" />
        <Image className="dark-mode-image" src="/yz-full-dark.svg" fill alt="yz-logo" />
      </div>
      <span className="text-3xl font-pixel">Realese soon</span>
    </div>
  )
}
export default page
