"use client";
import ClientUserBadge from "@/app/call/[callId]/client-user-badge";
import StatusButton from "@/app/call/[callId]/status-button";
import useTimeStore from "@/components/live/time.store";
import StatusBadge from "@/components/status-badge";
import { format, type Interval, isWithinInterval, parseISO } from "date-fns";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "mono/components/badge";
import { Button } from "mono/components/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Event } from "rest-api/types/calendar";



type Props = {
  defaultEvents?: Event[]
}
export default function LiveEvents({ defaultEvents = [] }: Props) {
  const [liveEvents, setLiveEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [canceledOrTentativeEvents, setCanceledOrTentativeEvents] = useState<Event[]>([]);
  const time = useTimeStore(state => state.time)


  useEffect(() => {
    const liveEvents = defaultEvents
      .filter((event) => event.status === "CONFIRMED")
      .filter((event) => {
        const startAt = parseISO(event.date_start)
        const endAt = parseISO(event.date_end)
        const interval: Interval = {
          start: startAt,
          end: endAt
        }
        return isWithinInterval(time, interval)
      })
    setLiveEvents(liveEvents)
    const events = (liveEvents.length !== 0
      ? defaultEvents.filter(
        (event) => !!liveEvents.find((e) => e.id !== event.id),
      )
      : defaultEvents).filter(event => event.status === "CONFIRMED");
    setEvents(events)
    const canceledOrTentativeEvents = defaultEvents.filter((event) => event.status === "CANCELLED" || event.status === "TENTATIVE")
    setCanceledOrTentativeEvents(canceledOrTentativeEvents)

  }, [time, defaultEvents])
  return (
    <>
      <EventsGroup
        hideEmpty
        label="Сейчас проходят"
        events={liveEvents}
      />
      <EventsGroup
        hideEmpty
        label="Предстоящие"
        events={events}
      />
      <EventsGroup
        hideEmpty
        label="Ожидают подтверждения или отменены"
        events={canceledOrTentativeEvents}
      />
    </>
  )
}

const EventCard = ({ event }: { event: Event }) => {
  const status = event.status ?? "TENTATIVE";
  const startAt = parseISO(event.date_start)
  const endAt = parseISO(event.date_end)

  const startTime = format(startAt, "HH:mm");
  const endTime = format(endAt, "HH:mm");

  const isCanceled = status === "CANCELLED"

  const callPage = `/call/${event.id}`;
  const guests = event.guests ?? [];

  const GUESTS_LIMIT = 3
  const isGuestsMoreThanLimit = guests.length > GUESTS_LIMIT;
  const guestsLimit = isGuestsMoreThanLimit ? guests.slice(0, GUESTS_LIMIT) : guests;

  return (
    <div
      key={event.id}
      className="w-full border py-3 space-y-2 px-4 rounded-md bg-card"
    >
      <div className="w-full flex justify-between">
        <div className="flex items-start flex-wrap gap-2">
          <StatusBadge status={status} />
          <Badge variant="secondary">{event.type === "event" ? "Событие" : "Созвон"}</Badge>
        </div>
        {
          isCanceled
            ?
            <Button size="sm" variant="secondary" disabled={isCanceled} className="text-xs h-[22px]" >
              Открыть
              <ArrowRightIcon className="size-3" />
            </Button>
            :
            <Button size="sm" variant="secondary" disabled={isCanceled} className="text-xs h-[22px]" asChild>
              <Link href={callPage}>
                Открыть
                <ArrowRightIcon className="size-3" />
              </Link>
            </Button>
        }
      </div>
      <div className="w-full flex items-center justify-between gap-2">
        <span className="text-base font-medium">{event.summary}</span>
        <span className="text-base font-medium">{startTime} - {endTime}</span>
      </div>
      <div className="*:block">
        <span className="text-sm text-muted-foreground">Заметка</span>
        <span className="text-sm text-foreground">{event.description || "Нет заметки"}</span>
      </div>
      <div className="flex pt-2 justify-between items-center gap-2">
        <div className="-space-y-2 *:inline">
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
        {
          status === "TENTATIVE" &&
          <StatusButton callId={event.id} status={status} />
        }
      </div>
    </div>
  );
}

type EventsGroupProps = {
  events?: Event[]
  label?: string
  hideEmpty?: boolean
}
const EventsGroup = ({ label = "Без названия", events = [], hideEmpty = false }: EventsGroupProps) => {
  if (hideEmpty && !events.length) return null;
  return (
    <div className="w-full space-y-3">
      <span className="block text-xl font-medium">{label}</span>
      {
        events
          .sort((a, b) => a.date_start.localeCompare(b.date_start))
          .map((event) => {
            return <EventCard key={event.id} event={event} />
          })}
    </div>
  );
}
