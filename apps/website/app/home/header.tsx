import { Logo } from "@/components/logo"
import { Button } from "mono/components/button"

const Header = () => {
  return (
    <header className="w-full h-16 flex items-center">
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="size-9" />
          <span className="text-2xl font-medium font-pixel">YZ13</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline">Sign In</Button>
        </div>
      </div>
    </header>
  )
}
export default Header
