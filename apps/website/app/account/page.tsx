import { UserCircleIcon } from "lucide-react"
import { Button } from "mono/components/button"



const page = () => {
  return (
    <div className="p-8 max-w-screen-xl mx-auto w-full h-fit flex">
      <aside className="w-64 h-fit p-2">
        <Button className="w-full gap-1.5 justify-start" variant="ghost">
          <UserCircleIcon size={16} />
          <span>Profile</span>
        </Button>
      </aside>
      <main className="w-[calc(100%-20rem)] p-2 h-fit"></main>
    </div>
  )
}

export default page