import { Logo } from "@/components/logo"
import User from "@/components/user"
import MatrixBox from "./matrix-box"




const page = () => {
  return (
    <>
      <header className="w-full max-w-4xl mx-auto mt-24 h-16 px-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="size-9" />
          <span className="font-pixel text-2xl">YZ13</span>
        </div>
        <div className="flex items-center gap-2">
          <User />
        </div>
      </header>
      <div
        className="h-fit w-full p-3 max-w-4xl mx-auto min-h-[calc(100dvh - 64px)] space-y-6"
      >
        <section className="w-full grid grid-cols-2 gap-3">
          <div className="w-full aspect-[16/10] border rounded-xl">
            <MatrixBox text="YZ13 ARE" className="w-full h-full aspect-auto" />
          </div>
          <div className="w-full aspect-[16/10] border rounded-xl"></div>
        </section>
      </div>
    </>
  )
}

export default page
