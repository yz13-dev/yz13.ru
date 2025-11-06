import { version } from "@/utils/version";


export default function Toolbar() {
  return (
    <div className="p-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm text-muted-foreground">
          v{version}
        </span>
        <span className="font-mono text-sm text-muted-foreground">
          /
        </span>
      </div>
      <div className="flex items-center gap-2"></div>
    </div>
  )
}
