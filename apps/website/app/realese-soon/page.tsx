import Image from "next/image"
import Link from "next/link"



const page = () => {
  return (
    <div className="w-full h-dvh relative flex flex-col gap-6 items-center justify-center">
      <div className="z-50 h-16 w-56 relative">
        <Image className="light-mode-image" src="/yz-full-light.svg" fill alt="yz-logo" />
        <Image className="dark-mode-image" src="/yz-full-dark.svg" fill alt="yz-logo" />
      </div>
      <span className="z-50 text-3xl font-pixel">Realese soon</span>
      <ul className="flex items-center justify-center gap-6">
        <li>
          <Link href="https://github.com/yz13-env">Github</Link>
        </li>
        <li>
          <Link href="https://t.me/yztheceo">Telegram</Link>
        </li>
      </ul>
    </div>
  )
}

export default page
