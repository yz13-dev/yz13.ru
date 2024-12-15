import { Loader2Icon } from "lucide-react"


const WorkspaceLoader = () => {
  return (
    <div className="w-full h-[calc(100dvh-36px)] flex items-center justify-center">
      <Loader2Icon size={24} className="animate-spin" />
    </div>
  )
}

export default WorkspaceLoader