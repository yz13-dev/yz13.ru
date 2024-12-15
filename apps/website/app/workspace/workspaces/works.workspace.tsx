import { Input } from "mono/components/input"



const WorksWorkspace = () => {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto p-8 w-full min-h-[calc(100dvh-36px)]">
        <div className="mt-20 w-full h-full space-y-8">
          <div className="max-w-md w-full mx-auto">
            <Input placeholder="Search..." className="w-full" />
          </div>
          <div className="w-full grid gap-6 grid-cols-5">
            <div className="w-full aspect-[4/3] rounded-xl border"></div>
            <div className="w-full aspect-[4/3] rounded-xl border"></div>
            <div className="w-full aspect-[4/3] rounded-xl border"></div>
            <div className="w-full aspect-[4/3] rounded-xl border"></div>
            <div className="w-full aspect-[4/3] rounded-xl border"></div>

            <div className="w-full aspect-[4/3] rounded-xl border"></div>
            <div className="w-full aspect-[4/3] rounded-xl border"></div>
            <div className="w-full aspect-[4/3] rounded-xl border"></div>
            <div className="w-full aspect-[4/3] rounded-xl border"></div>
            <div className="w-full aspect-[4/3] rounded-xl border"></div>

            <div className="w-full aspect-[4/3] rounded-xl border"></div>
            <div className="w-full aspect-[4/3] rounded-xl border"></div>
            <div className="w-full aspect-[4/3] rounded-xl border"></div>
            <div className="w-full aspect-[4/3] rounded-xl border"></div>
            <div className="w-full aspect-[4/3] rounded-xl border"></div>

          </div>
        </div>
      </div>
    </>
  )
}

export default WorksWorkspace