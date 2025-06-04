"use client"
import { CalendarCheckIcon, CalendarXIcon, Loader2Icon } from "lucide-react"
import { Button } from "mono/components/button"
import { toast } from "mono/components/sonner"
import { useState } from "react"
import { updateEvent } from "rest-api/calendar"

export default function StatusButton({ callId, status, withLabel = true, disabled }: { disabled?: boolean, withLabel?: boolean, callId: string, status: string }) {
  const [loading, setLoading] = useState<boolean>(false)

  const updateStatus = async (status: string) => {
    setLoading(true)
    try {
      const { data } = await updateEvent(callId, {
        status,
      })

      if (data) {
        toast("Стутус успешно изменен")
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "TENTATIVE")
    return (
      <Button
        variant={loading ? "secondary" : "default"}
        disabled={disabled ?? loading}
        onClick={() => updateStatus("CONFIRMED")}
      >
        {
          loading
            ? <Loader2Icon size={16} className="animate-spin" />
            : <CalendarCheckIcon size={16} />
        }
        {
          withLabel && "Подтвердить"
        }
      </Button>
    )
  return (
    <Button
      variant={loading ? "secondary" : "destructive"}
      disabled={disabled ?? loading}
      onClick={() => updateStatus("CANCELLED")}
    >
      {
        loading
          ? <Loader2Icon size={16} className="animate-spin" />
          : <CalendarXIcon size={16} />
      }
      {
        withLabel && "Отменить"
      }
    </Button>
  )
}
