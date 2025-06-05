"use client"

import { format, isToday, parseISO } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Event } from "rest-api/types/calendar";
import { createClient } from "yz13/supabase/client";


export default function ({ userId, calls: defaultCalls = [] }: { userId: string, calls?: Event[] }) {

  const [calls, setCalls] = useState<Event[]>(defaultCalls);
  const firstCall = calls[0]
  const restOfCalls = calls.slice(1)

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
          console.log("channel status", status)
          console.log("channel error", error)
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
        <div className="h-full flex group flex-row px-3 hover:bg-secondary rounded-full transition-colors py-1 gap-2 items-center">
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
        <span className="text-xs text-muted-foreground">+{restOfCalls.length}</span>
      }
    </div>
  )
}
