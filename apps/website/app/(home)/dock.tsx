import { LayoutGridIcon, SearchIcon } from "lucide-react"
import { Button } from "mono/components/button"
import { Input } from "mono/components/input"

const Dock = () => {
  return (
    <footer className="max-w-md border w-full h-14 flex items-center gap-2 rounded-xl fixed bottom-8 mx-auto left-0 right-0 p-2 bg-background">
      <Button size="sm" className="h-full aspect-square px-1" variant="outline"><LayoutGridIcon size={16} /></Button>
      <Button size="sm" className="h-full aspect-square px-1" variant="outline"><SearchIcon size={16} /></Button>
      <Input className="w-full h-full" placeholder="Search" />
    </footer>
  )
}
export default Dock