"use client";
import ClientUserBadge from "@/components/client-user-badge";
import useTimeStore, { getTime } from "@/components/live/time.store";
import MicroButton from "@/components/micro-button";
import StatusBadge from "@/components/status-badge";
import StatusButton from "@/components/status-button";
import { getUserEvents } from "@yz13/api/calendar/events";
import type { Event } from "@yz13/api/types/calendar";
import { createClient } from "@yz13/supabase/client";
import { cn } from "@yz13/ui/cn";
import { Badge } from "@yz13/ui/components/badge";
import { format, type Interval, isPast, isWithinInterval, parseISO } from "date-fns";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const getLiveEvents = (events: Event[]) => {
  if (!events.length) return [];
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
  if (!events.length) return [];
  const liveEvents = getLiveEvents(events)
  if (liveEvents.length !== 0) return events
    .filter(event => {
      const endAt = parseISO(event.date_end)
      return !isPast(endAt)
    })
    .filter(event => event.status === "CONFIRMED")
    .filter(
      (event) => !!liveEvents.find((e) => e.id !== event.id),
    )
  return events.filter(event => event.status === "CONFIRMED")
};

const getCanceledOrTentativeEvents = (events: Event[]) => {
  if (!events.length) return [];
  return events.filter((event) => event.status === "CANCELLED" || event.status === "TENTATIVE")
}

const getPastEvents = (events: Event[]) => {
  if (!events.length) return [];
  return events.filter(event => {
    const endAt = parseISO(event.date_end)
    return isPast(endAt)
  })
}

type Props = {
  defaultEvents?: Event[]
  uid?: string;
  date?: string;
}
export default function LiveEvents({ defaultEvents = [], uid, date }: Props) {
  const [allEvents, setAllEvents] = useState<Event[]>(defaultEvents);

  const time = useTimeStore(state => state.time)

  const liveEvents: Event[] = useMemo(() => getLiveEvents(allEvents), [allEvents, time])

  const pendingEvents: Event[] = useMemo(() => getPendingEvents(allEvents), [allEvents, time]);

  const canceledOrTentativeEvents: Event[] = useMemo(() => getCanceledOrTentativeEvents(allEvents), [allEvents, time]);

  const pastEvents: Event[] = useMemo(() => getPastEvents(allEvents), [allEvents, time]);


  const refreshEvents = async () => {
    if (!date) return;
    if (!uid) return;
    const { data } = await getUserEvents(uid, { date });
    if (data) setAllEvents(data)
  }


  useEffect(() => {
    const client = createClient()
    const channelId = `calendar:events:${uid}`

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
          // console.log(body)
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

  }, [uid, date])
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
      <EventsGroup
        hideEmpty
        label="Прошедшие"
        events={pastEvents}
        uid={uid}
        disabled
      />
    </>
  )
}

const EventCard = ({ event, userId, disabled = false }: { event: Event, userId?: string, disabled?: boolean }) => {
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

  const isDisabledOrCanceled = disabled || isCanceled
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
        <div className="flex items-center gap-2">
          {
            isDisabledOrCanceled
              ?
              <MicroButton size="sm" variant="secondary" disabled={disabled ?? isCanceled}>
                Открыть
                <ArrowRightIcon />
              </MicroButton>
              :
              <MicroButton size="sm" variant="secondary" disabled={disabled ?? isCanceled} asChild>
                <Link href={callPage}>
                  Открыть
                  <ArrowRightIcon />
                </Link>
              </MicroButton>
          }
        </div>
      </div>
      <div className="w-full flex items-center justify-between gap-2">
        <span className="text-base font-medium">{event.summary}</span>
        <span className="text-base font-medium">{startTime} - {endTime}</span>
      </div>
      <div className="*:block">
        <span className={cn("text-sm", event.description ? "text-foreground" : "text-muted-foreground")}>{event.description || "Нет заметки"}</span>
      </div>
      <div className="flex pt-2 justify-between items-center gap-2">
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
        <div className="flex items-center gap-2">
          {
            isTentative && !isGuest &&
            <StatusButton disabled={disabled} callId={eventId} status={"CONFIRMED"} withLabel={false} />
          }
          {
            isCanceled
              ? <span className="text-sm text-muted-foregroundextmu">Событие отменено</span>
              :
              isGuest && status === "TENTATIVE"
                ? <StatusButton disabled={disabled} callId={eventId} status={"CONFIRMED"} />
                : <StatusButton disabled={disabled} callId={eventId} status={status} />
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
  disabled?: boolean;
}
const EventsGroup = ({ label = "Без названия", events = [], hideEmpty = false, uid, disabled = false }: EventsGroupProps) => {
  if (hideEmpty && !events.length) return null;
  return (
    <div className="w-full space-y-3">
      <span className="block text-xl font-medium">{label}</span>
      {
        events
          .sort((a, b) => a.date_start.localeCompare(b.date_start))
          .map((event) => {
            return <EventCard key={event.id} userId={uid} event={event} disabled={disabled} />
          })}
    </div>
  );
}
