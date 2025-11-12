import { version } from "@/utils/version";
import { Badge } from "@yz13/ui/badge";


export default function Toolbar() {
  return (
    <div className="p-6 font-mono flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Badge variant="secondary">yz13@yz13.ru</Badge>
        <Badge variant="secondary">v{version}</Badge>
        <Badge variant="secondary">/</Badge>
      </div>
      <div className="flex items-center gap-2"></div>
    </div>
  )
}
