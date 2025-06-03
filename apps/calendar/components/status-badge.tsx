import { getStatusBadgeVariant, getStatusLabel } from "@/const/status-map";
import { Badge } from "mono/components/badge";




export default function StatusBadge({ status }: { status: string }) {
  const label = getStatusLabel(status);
  return (
    <Badge
      variant={getStatusBadgeVariant(status)}
      data-status={status}>
      {label}
    </Badge>
  );
}
