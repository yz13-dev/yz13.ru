import { Checkbox } from "mono/components/checkbox"



const page = () => {
  return (
    <div className="max-w-screen-sm mx-auto p-6 border-x w-full space-y-4 min-h-screen">
      <h1 className="text-secondary">Roadmap</h1>

      <div className="relative flex items-center">
        <span className="text-secondary text-sm px-2 py-1 rounded-lg border">2023</span>
      </div>
      <RoadMapCard />
    </div>
  )
}

const RoadMapCard = () => {
  return (
    <div className="w-full space-y-2">
      <div className="w-full flex">
        <div className="flex flex-col gap-2">
          <div className="size-7 shrink-0 flex items-center justify-center">
            <Checkbox />
          </div>
          <div className="w-full h-full"></div>
        </div>
        <div className="w-full space-y-2 p-2 border rounded-xl">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-foreground text-sm">Action</span>
            </div>
            <span className="text-secondary text-sm">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
