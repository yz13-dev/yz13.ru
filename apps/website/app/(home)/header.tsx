import { MenuIcon, UserIcon } from "lucide-react"
import { Button } from "mono/components/button"

const Header = () => {
  return (
    <header className="w-full page-width-limit flex items-center">
      <div className="rounded-xl border bg-yz-neutral-100 flex items-center gap-2 w-fit pl-2 p-1">
        <nav className="flex items-center gap-1">
          <Button variant="secondary" size="sm">Home</Button>
          <Button variant="ghost" size="sm">Works</Button>
          <Button variant="ghost" size="sm">Socials</Button>
        </nav>
        <div className="flex items-center rounded-lg border">
          <Button className="rounded-r-none" variant="ghost" size="icon"><MenuIcon size={16} /></Button>
          <Button className="rounded-l-none" variant="ghost" size="icon">
            <UserIcon size={16} />
          </Button>
        </div>
      </div>
    </header>
  )
}
export default Header
