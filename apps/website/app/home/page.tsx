import Footer from "@/components/footer"
import { Logo } from "@/components/logo"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { Button } from "mono/components/button"
import Image from "next/image"
import Link from "next/link"


const page = () => {
  return (
    <>
      <header className="w-full max-w-screen-2xl mx-auto h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="h-5 w-32 relative">
            <Image className="light-mode-image" src="/yz-full-light.svg" fill alt="yz-logo" />
            <Image className="dark-mode-image" src="/yz-full-dark.svg" fill alt="yz-logo" />
          </Link>
          <nav className="flex items-center gap-2">
            <Button className="h-8" variant="ghost" size="sm">Products</Button>
          </nav>
        </div>
        <div className="size-8 bg-yz-neutral-200 rounded-full"></div>
      </header>
      <main className="max-w-5xl w-full mx-auto mt-14">
        <div className="w-full h-[450px] border">
          <div className="w-full h-36 flex items-center border-b justify-center">
            <Logo className="size-20" />
          </div>
          <div className="w-full h-[calc(100%-144px)] flex items-center divide-x">
            <div className="w-36 h-full"></div>
            <div className="w-[calc(100%-144px-144px)] h-full p-6 flex flex-col gap-4 items-center justify-center">
              <h1 className="text-4xl font-semibold">Welcome, i'm a YZ13</h1>
              <p className="text-base text-secondary">
                I'm a full stack developer with a passion for building scalable and performant applications.
              </p>
            </div>
            <div className="w-36 h-full"></div>
          </div>
        </div>
      </main>
      <Footer className="max-w-5xl mx-auto mt-14" />
      <div className="my-14 max-w-5xl w-full mx-auto mt-14 flex items-center justify-between">
        <span className="text-xs text-secondary">@YZ13</span>
        <div className="flex items-center rounded-full border">
          <Button className="size-6 rounded-full" variant="outline"><SunIcon size={14} /></Button>
          <Button className="size-6 rounded-full" variant="ghost"><MonitorIcon size={14} /></Button>
          <Button className="size-6 rounded-full" variant="ghost"><MoonIcon size={14} /></Button>
        </div>
      </div>
    </>
  )
}

export default page
