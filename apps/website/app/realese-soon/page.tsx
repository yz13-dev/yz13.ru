import Image from "next/image"
import BgCanvas from "./bg-canvas"



const page = () => {
  return (
    <div className="w-full h-dvh relative flex flex-col gap-6 items-center justify-center">
      <BgCanvas className="w-full h-full absolute inset-0" />
      <div className="z-50 h-16 w-56 relative bg-background">
        <Image className="light-mode-image" src="/yz-full-light.svg" fill alt="yz-logo" />
        <Image className="dark-mode-image" src="/yz-full-dark.svg" fill alt="yz-logo" />
      </div>
      <span className="z-50 text-3xl font-pixel bg-background">Realese soon</span>
    </div>
  )
}

export default page
