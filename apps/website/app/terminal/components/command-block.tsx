import Command from "./command";
import Toolbar from "./toolbar";



export default function CommandBlock({
  children,
  command,
  as = "div"
}: {
  as?: keyof HTMLElementTagNameMap,
  children: React.ReactNode,
  command?: string
}) {

  const Tag = as;

  return (
    <div className="w-full">
      <Toolbar />
      <Tag className="px-6 pb-6 font-mono space-y-3">
        {
          command &&
          <Command command={command} />
        }
        {children}
      </Tag>
    </div>
  )
}
