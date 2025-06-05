"use client"

import useTimeStore from "@/components/live/time.store";
import { format, interval, isToday, isWithinInterval, parseISO } from "date-fns";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Event } from "rest-api/types/calendar";
import { createClient } from "yz13/supabase/client";

export default function ({ userId, calls: defaultCalls = [] }: { userId: string, calls?: Event[] }) {

  const time = useTimeStore(state => state.time);

  const [calls, setCalls] = useState<Event[]>(defaultCalls);

  const sortedCalls = calls
    .filter(call => {
      const endAt = parseISO(call.date_end)
      const currentAsMinutes = time.getMinutes() + time.getHours() * 60;
      const endAtAsMinutes = endAt.getMinutes() + endAt.getHours() * 60;
      return currentAsMinutes <= endAtAsMinutes;
    })
    .sort((a, b) => a.date_start.localeCompare(b.date_start))

  const firstCall = sortedCalls[0];

  const isFirstCallLive = useMemo(() => {
    if (!firstCall) return false;
    const startAt = parseISO(firstCall.date_start)
    const endAt = parseISO(firstCall.date_end)

    const callInterval = interval(startAt, endAt)

    return isWithinInterval(time, callInterval)

  }, [time, firstCall])

  const restOfCalls = sortedCalls.slice(1)

  useEffect(() => {
    const client = createClient()
    const channelId = `calendar:events:${userId}`

    const channel = client.channel(channelId)

    channel
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "calendar_events",
      },
        (payload) => {
          const body = payload.new as Event;
          const organizerId = body.organizer_id
          const guests = body.guests ?? [];
          const isOrganizerOrGuest = organizerId === userId || guests.includes(userId)
          if (!isOrganizerOrGuest) return;
          const isInsert = payload.eventType === "INSERT"
          const isUpdate = payload.eventType === "UPDATE"
          // console.log(body)
          if (isInsert) {
            const startAt = parseISO(body.date_start)
            const isItToday = isToday(startAt)
            if (isItToday) {
              setCalls(prev => [...prev, body])
            }
          }
          if (isUpdate) {
            setCalls(prev => prev.map(item => {
              if (item.id === body.id) return body
              return item
            }))
          }
        })
      .subscribe(
        (status, error) => {
          console.log("CHANNEL STATUS", status)
          if (error) console.log("channel error", error)
        },
      )

    return () => {
      channel.unsubscribe()
    }

  }, [userId])
  return (
    <div className="h-fit w-fit flex flex-row items-center gap-2">
      {
        firstCall &&
        <div className="h-full flex group flex-row px-3 hover:bg-secondary rounded-full transition-colors py-1 gap-2 items-center bg-secondary/40">
          <AnimatePresence>
            {
              isFirstCallLive &&
              <motion.div
                initial={{ opacity: 0, width: 0, height: 0 }}
                animate={{ opacity: 1, width: 8, height: 8 }}
                exit={{ opacity: 0, width: 0, height: 0 }}
                className="size-2 group relative">
                <div
                  className="absolute inset-0 size-2 animate-ping rounded-full bg-foreground"
                />
                <div className="size-2 animate-pulse rounded-full bg-foreground" />
              </motion.div>
            }
          </AnimatePresence>
          <Link
            href={`https://calendar.yz13.ru/call/${firstCall.id}?continue=https://yz13.ru`}
            className="text-sm font-medium group-hover:underline">
            {firstCall.summary}
          </Link>
          <span className="text-xs text-muted-foreground">
            {format(parseISO(firstCall.date_start), "HH:mm")} - {format(parseISO(firstCall.date_end), "HH:mm")}
          </span>
        </div>
      }
      {
        restOfCalls.length >= 1 &&
        <div className="py-1 aspect-square h-7 flex items-center justify-center rounded-full group-hover:bg-secondary bg-secondary/40">
          <span className="text-xs text-muted-foreground">+{restOfCalls.length}</span>
        </div>
      }
    </div>
  )
}
