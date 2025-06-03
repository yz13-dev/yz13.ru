
export const statuses = {
  "TENTATIVE": "Ждет подтверждения",
  "CONFIRMED": "Подтверждено",
  "CANCELLED": "Отменено",
}

export const getStatusBadgeVariant = (status: string | null) => {
  if (!status) return "secondary";
  if (status === "TENTATIVE") return "secondary";
  if (status === "CONFIRMED") return "default";
  if (status === "CANCELLED") return "destructive";
  return "secondary"
}


export const getStatusLabel = (status: string | null) => {
  if (!status) return "Не определен";
  return statuses[status as keyof typeof statuses] ?? "Не определен";
}
