




export const statuses = {
  "TENTATIVE": "Ждет подтверждения",
  "CONFIRMED": "Подтверждено",
  "CANCELLED": "Отменено",
}


export const getStatusLabel = (status: string | null) => {
  if (!status) return "Не определен";
  return statuses[status as keyof typeof statuses] ?? "Не определен";
}
