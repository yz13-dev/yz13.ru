"use client";
import ClientUserBadge from "@/app/call/[callId]/client-user-badge";
import StatusButton from "@/app/call/[callId]/status-button";
import useTimeStore, { getTime } from "@/components/live/time.store";
import StatusBadge from "@/components/status-badge";
import { format, type Interval, isWithinInterval, parseISO } from "date-fns";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "mono/components/badge";
import { Button } from "mono/components/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserEvents } from "rest-api/calendar";
import type { Event } from "rest-api/types/calendar";
import { cn } from "yz13/cn";
import { createClient } from "yz13/supabase/client";

const getLiveEvents = (events: Event[]) => {
  const time = getTime()
  return events
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
}
const getPendingEvents = (events: Event[]) => {
  const liveEvents = getLiveEvents(events)
  if (liveEvents.length !== 0) return events
    .filter(
      (event) => !!liveEvents.find((e) => e.id !== event.id),
    )
  return events.filter(event => event.status === "CONFIRMED")
};

const getCanceledOrTentativeEvents = (events: Event[]) => {
  return events.filter((event) => event.status === "CANCELLED" || event.status === "TENTATIVE")
}

type Props = {
  defaultEvents?: Event[]
  uid?: string;
  date?: string;
}
export default function LiveEvents({ defaultEvents = [], uid, date }: Props) {
  const [allEvents, setAllEvents] = useState<Event[]>(defaultEvents);


  const liveEvents: Event[] = getLiveEvents(allEvents)

  const pendingEvents: Event[] = getPendingEvents(allEvents);

  const canceledOrTentativeEvents: Event[] = getCanceledOrTentativeEvents(allEvents);

  const time = useTimeStore(state => state.time)

  const refreshEvents = async () => {
    if (!date) return;
    if (!uid) return;
    const { data } = await getUserEvents(uid, { date });
    if (data) setAllEvents(data)
  }

  useEffect(() => {
    const client = createClient()
    const channelId = `calendar:events:${uid}`
    console.log(channelId)
    const channel = client.channel(channelId)

    channel
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "calendar_events",
      },
        (payload) => {
          if (!uid) return;
          const body = payload.new as Event;
          const organizerId = body.organizer_id
          const guests = body.guests ?? [];
          const isOrganizerOrGuest = organizerId === uid || guests.includes(uid)
          if (!isOrganizerOrGuest) return;
          const isInsert = payload.eventType === "INSERT"
          const isUpdate = payload.eventType === "UPDATE"
          console.log(body)
          if (isInsert || isUpdate) {
            refreshEvents()
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

  }, [uid])
  return (
    <>
      <EventsGroup
        hideEmpty
        label="Сейчас проходят"
        events={liveEvents}
        uid={uid}
      />
      <EventsGroup
        hideEmpty
        label="Предстоящие"
        events={pendingEvents}
        uid={uid}
      />
      <EventsGroup
        hideEmpty
        label="Ожидают подтверждения или отменены"
        events={canceledOrTentativeEvents}
        uid={uid}
      />
    </>
  )
}

const EventCard = ({ event, userId }: { event: Event, userId?: string }) => {
  const eventId = event.id;
  const status = event.status ?? "TENTATIVE";
  const startAt = parseISO(event.date_start)
  const endAt = parseISO(event.date_end)

  const startTime = format(startAt, "HH:mm");
  const endTime = format(endAt, "HH:mm");

  const isCanceled = status === "CANCELLED"
  const isTentative = status === "TENTATIVE"

  const callPage = `/call/${eventId}`;
  const guests = event.guests ?? [];

  const GUESTS_LIMIT = 3
  const isGuestsMoreThanLimit = guests.length > GUESTS_LIMIT;
  const guestsLimit = isGuestsMoreThanLimit ? guests.slice(0, GUESTS_LIMIT) : guests;

  const isGuest = userId !== undefined && userId !== event.organizer_id && guests.includes(userId);

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
        <span className={cn("text-sm", event.description ? "text-foreground" : "text-muted-foreground")}>{event.description || "Нет заметки"}</span>
      </div>
      <div className="flex pt-2 justify-between items-center gap-2">
        <div className="-space-x-4 h-8 *:border-2 *:border-background *:inline-block">
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
        <div className="flex items-center gap-2">
          {
            isTentative && !isGuest &&
            <StatusButton callId={eventId} status={"CONFIRMED"} withLabel={false} />
          }
          {
            isCanceled
              ? <span className="text-sm text-muted-foregroundextmu">Событие отменено</span>
              :
              isGuest && status === "TENTATIVE"
                ? <StatusButton callId={eventId} status={"CONFIRMED"} />
                : <StatusButton callId={eventId} status={status} />
          }
        </div>
      </div>
    </div>
  );
}

type EventsGroupProps = {
  events?: Event[]
  label?: string
  hideEmpty?: boolean
  uid?: string;
}
const EventsGroup = ({ label = "Без названия", events = [], hideEmpty = false, uid }: EventsGroupProps) => {
  if (hideEmpty && !events.length) return null;
  return (
    <div className="w-full space-y-3">
      <span className="block text-xl font-medium">{label}</span>
      {
        events
          .sort((a, b) => a.date_start.localeCompare(b.date_start))
          .map((event) => {
            return <EventCard key={event.id} userId={uid} event={event} />
          })}
    </div>
  );
}
