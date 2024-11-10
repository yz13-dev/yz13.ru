import { Checkbox } from "@yz13/mono/components/checkbox"


const Tasks = () => {
  return (
    <ul className="space-y-1.5">
      <li>
        <div className="w-full border hover:bg-yz-neutral-100 hover:border-foreground flex items-center justify-between rounded-lg p-2 ">
          <div className="flex items-center gap-2">
            <Checkbox id="checkbox-task-1" />
            <label className="text-xs" htmlFor="checkbox-task-1">Complete some stuff</label>
          </div>
        </div>
      </li>
      <li>
        <div className="w-full border hover:bg-yz-neutral-100 hover:border-foreground flex items-center justify-between rounded-lg p-2 ">
          <div className="flex items-center gap-2">
            <Checkbox id="checkbox-task-2" />
            <label className="text-xs" htmlFor="checkbox-task-2">Start to todo stuff</label>
          </div>
        </div>
      </li>
    </ul>)
}
export default Tasks
