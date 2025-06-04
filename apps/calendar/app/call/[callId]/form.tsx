"use client";

import MicroButton from "@/components/micro-button";
import { getStatusLabel } from "@/const/status-map";
import { useTz } from "@/hooks/use-tz";
import { tz } from "@date-fns/tz";
import { format, parseISO } from "date-fns";
import { ArrowLeftIcon, CalendarIcon, Edit2Icon, ExternalLinkIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Event } from "rest-api/types/calendar";
import { createClient } from "yz13/supabase/client";
import ClientUserBadge from "../../../components/client-user-badge";
import StatusButton from "../../../components/status-button";
import CallCalendar from "./components/call-calendar";
import EditUrlModal from "./components/edit-url-modal";


type Props = {
  callId: string;
  call: Event;
  userId: string;
  continueLink?: string
}
export default function ({ call: defaultCall, callId, userId, continueLink }: Props) {
  const [call, setCall] = useState<Event>(defaultCall);
  const organizer = call.organizer_id;
  const guests = call.guests ?? [];

  const timezone = useTz();

  const isOrganizer = userId === organizer;
  const isGuest = userId !== organizer && guests.includes(userId);

  const shortId = callId.slice(0, 6)

  const startAt = parseISO(call.date_start, {
    in: tz("UTC"),
  })
  const endAt = parseISO(call.date_end, {
    in: tz("UTC"),
  });

  const startTime = format(startAt, "HH:mm", {
    in: tz(timezone),
  });
  const endTime = format(endAt, "HH:mm", {
    in: tz(timezone),
  });

  const GUESTS_LIMIT = 3
  const isGuestsMoreThanLimit = guests.length > GUESTS_LIMIT;
  const guestsLimit = isGuestsMoreThanLimit ? guests.slice(0, GUESTS_LIMIT) : guests;

  const status = call.status ?? "TENTATIVE";
  const isCanceled = call.status === "CANCELLED";
  const isTentative = call.status === "TENTATIVE";

  useEffect(() => {
    const client = createClient()
    const channelId = `calendar:call:${callId}`
    console.log(channelId)
    const channel = client.channel(channelId)

    channel
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "calendar_events",
        filter: `id=eq.${callId}`,
      },
        (payload) => {
          const isUpdate = payload.eventType === "UPDATE"
          if (isUpdate) {
            const newCall = payload.new as Event;
            setCall(newCall)
          }
        })
      .subscribe(
        (status, error) => {
          console.log("channel status", status)
          console.log("channel error", error)
        },
      )

    return () => {
      channel.unsubscribe()
    }

  }, [callId])
  return (
    <>
      <div className="max-w-2xl w-full mx-auto p-6 space-y-6 mt-[10%]">
        <div className="w-full flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href={continueLink ?? "/"}>
              <ArrowLeftIcon size={16} />
              Вернуться
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            {
              isTentative && !isGuest &&
              <StatusButton callId={callId} status={"CONFIRMED"} withLabel={false} />
            }
            {
              isCanceled
                ? <span className="text-sm text-muted-foregroundextmu">Событие отменено</span>
                :
                isGuest && status === "TENTATIVE"
                  ? <StatusButton callId={callId} status={"CONFIRMED"} />
                  : <StatusButton callId={callId} status={status} />
            }
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <div className="size-14 bg-card rounded-md border flex items-center justify-center">
              <CalendarIcon size={28} className="text-muted-foreground" />
            </div>
            <div className="*:block">
              <h1 className="lg:text-2xl text-xl font-medium">Событие #{shortId}</h1>
              {
                call.summary &&
                <p className="lg:text-base text-sm text-muted-foreground">{call.summary}</p>
              }
            </div>
          </div>
          <span className="lg:text-2xl text-xl font-medium">{startTime} - {endTime}</span>
        </div>
      </div>

      <div className="max-w-2xl w-full flex md:flex-row flex-col mx-auto p-6 gap-6">
        <div className="p-2 md:max-w-xs rounded-md border bg-card w-full">
          <CallCalendar call={call} />
        </div>
        <div className="w-full h-full space-y-4">
          {
            call.description &&
            <div className="space-y-0">
              <span className="text-base block font-medium">Заметка к событию</span>
              <span className="text-sm text-muted-foreground">{call.description}</span>
            </div>
          }
          <div className="space-y-0">
            <span className="text-base block font-medium">Статус</span>
            <span className="text-sm text-muted-foreground">{getStatusLabel(call.status)}</span>
          </div>
          <div className="space-y-2">
            <span className="text-base block font-medium">Организатор и участники</span>
            <div className="flex items-center justify-between w-full">
              <ClientUserBadge userId={organizer} showName />
              <div className="-space-x-4 h-9 *:border-2 *:border-background *:inline-block">
                {
                  guestsLimit
                    .map(guest => <ClientUserBadge userId={guest} key={guest} />)
                }
                {
                  isGuestsMoreThanLimit &&
                  <div className="size-9 flex items-center justify-center border rounded-full">
                    <span className="text-xs text-muted-foreground">+{guests.length - GUESTS_LIMIT}</span>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-base block font-medium">Ссылка</span>
              {
                isOrganizer &&
                <EditUrlModal callId={callId}>
                  <MicroButton variant="secondary" size="sm">
                    <Edit2Icon />
                    Изменить
                  </MicroButton>
                </EditUrlModal>
              }
            </div>
            {
              call.url &&
              <Link href={call.url} target="_blank" className="text-sm flex gap-1 items-center hover:underline text-muted-foreground line-clamp-1">
                {call.url}
                <ExternalLinkIcon size={14} />
              </Link>
            }
          </div>
        </div>
      </div>
    </>
  )
}
