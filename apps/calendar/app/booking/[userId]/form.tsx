"use client";
import AutoTextarea from "@/components/auto-textarea";
import { ru } from "date-fns/locale";
import { Button } from "mono/components/button";
import { Calendar } from "mono/components/calendar";
import { Input } from "mono/components/input";
import { Separator } from "mono/components/separator";

export default function form({ className = "" }: { className?: string }) {
  return (
    <>
      <div className="w-full divide-y">
        <div className="flex *:p-6 divide-x md:flex-row flex-col-reverse">
          <div className="md:w-2/3 w-full space-y-6">
            <Calendar className="p-0" locale={ru} />
            <Separator />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Имя *</span>
                <Input />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Почта *</span>
                <Input />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">
                  Заметка к созвону
                </span>
                <AutoTextarea className="border rounded-3xl px-3 py-2 min-h-16" />
              </div>
            </div>
          </div>
          <div className="md:w-1/3 overflow-auto w-full flex md:flex-col flex-row gap-1.5 md:*:w-full *:w-fit">
            <Button variant="outline">10:00</Button>
            <Button variant="outline">12:00</Button>
            <Button variant="outline">14:00</Button>
            <Button variant="outline">16:00</Button>
            <Button variant="outline">18:00</Button>
            <Button variant="outline">20:00</Button>
            <Button variant="outline">22:00</Button>
          </div>
        </div>
        <div className="w-full flex justify-end px-6 py-3">
          <Button>Подтвердить</Button>
        </div>
      </div>
    </>
  );
}
