import AutoTextarea from "@/components/auto-textarea"
import { Logo } from "@/components/logo"
import { SidebarIcon, TextIcon } from "lucide-react"
import { Button } from "mono/components/button"
import ChatInput from "./chat-input"


const page = () => {
  return (
    <>
      <canvas className="w-full h-dvh bg-[#EEE]" />
      <div className="w-64 h-dvh absolute left-0 bottom-0 flex flex-col">
        <div className="w-full p-2 flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Logo className="size-7" />
            <span className="w-fit px-2 py-1 rounded-lg bg-background text-sm">Draft name</span>
          </div>
          <Button size="icon" variant="secondary"><SidebarIcon size={16} /></Button>
        </div>
        <div className="w-full h-full rounded-tr-xl bg-background"></div>
      </div>
      <div className="w-64 h-dvh absolute right-0 bottom-0 flex flex-col">
        <div className="w-full p-2 flex items-center gap-2 justify-between">
          <div className="w-full h-7"></div>
        </div>
        <div className="w-full h-full rounded-tl-xl bg-background"></div>
      </div>
      <footer className="w-full h-fit flex items-end gap-2 fixed left-0 right-0 max-w-md mx-auto bottom-2 p-1 border rounded-xl bg-background">
        <ChatInput />
        <Button>Send</Button>
      </footer>
    </>
  )
}

export default page
