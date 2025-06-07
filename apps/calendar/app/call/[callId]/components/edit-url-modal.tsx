"use client";

import { Loader2Icon } from "lucide-react";
import { Button } from "mono/components/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "mono/components/dialog";
import { Input } from "mono/components/input";
import { useState } from "react";
import { updateEvent } from "rest-api/calendar/events";

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export default function ({ callId, children, url: defaultUrl = "" }: { callId: string, children?: React.ReactNode, url?: string }) {

  const [loading, setLoading] = useState<boolean>(false);

  const [url, setUrl] = useState<string>(defaultUrl);
  const [open, setOpen] = useState<boolean>(false);

  const isValid = isValidUrl(url)

  const disabled = !isValid || loading

  const updateUrl = async (url: string | null) => {
    setLoading(true)
    try {
      const { data } = await updateEvent(callId, { url })
      if (data) setOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={!!children}>{children}</DialogTrigger>
      <DialogContent aria-disabled={loading}>
        <DialogTitle>Изменить ссылку</DialogTitle>
        <DialogDescription>
          Ссылка на событие отобразится сразу после обновления.
        </DialogDescription>

        <Input
          aria-invalid={!isValid}
          disabled={loading}
          placeholder="Введите ссылку"
          className="w-full"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <DialogFooter className="mt-4">
          <Button
            variant="ghost"
            disabled={loading}
            onClick={() => updateUrl(null)}
          >
            Удалить ссылку
          </Button>
          <Button
            disabled={disabled}
            onClick={() => updateUrl(url)}
          >
            {loading && <Loader2Icon className="animate-spin" />}
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
