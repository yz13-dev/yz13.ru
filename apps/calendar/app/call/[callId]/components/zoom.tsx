"use client";

import { getCallLink } from "@/lib/booking-link";
import { Loader2Icon, RefreshCw, SparklesIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { useEffect, useState } from "react";
import { getEventById, updateEvent } from "rest-api/calendar/events";
import { createMeeting } from "rest-api/meetings";
import { createClient } from "yz13/supabase/client";


export default function ({ callId }: { callId: string }) {

  const [token, setToken] = useState<string | null>(null);
  const [needReauthenticate, setNeedReauthenticate] = useState(false);
  const [loading, setLoading] = useState(true);

  const create = async () => {
    setLoading(true);
    const { data: call } = await getEventById(callId)
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    try {
      if (!token) throw new Error("Token not found")
      if (!call) throw new Error("Call not found")
      const meeting = await createMeeting(token, call, timezone)

      console.log(meeting)

      if (meeting) {

        const jourUrl = meeting.join_url
        const conference_id = meeting.id
        await updateEvent(callId, {
          url: jourUrl,
          conference_id
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const reauthenticate = async () => {
    setLoading(true)
    try {
      const client = createClient()
      const auth = client.auth
      const { data } = await auth.signInWithOAuth({
        provider: "zoom",
        options: {
          redirectTo: getCallLink(callId)
        }
      })
      if (data) {
        setNeedReauthenticate(false)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const client = createClient()

    const auth = client.auth

    auth.getSession()
      .then(({ data: { session } }) => {
        const accessToken = session?.provider_token;
        if (!accessToken) {
          setNeedReauthenticate(true)
        } else setToken(accessToken)
      })
      .finally(() => setLoading(false))

  }, [])
  if (needReauthenticate) {
    return (
      <Button disabled={loading} onClick={reauthenticate} >
        {
          loading
            ? <Loader2Icon className="animate-spin" />
            : <RefreshCw />
        }
        Войти в Zoom и создать
      </Button>
    )
  }
  return (
    <Button variant="secondary" disabled={loading || needReauthenticate} onClick={create} >
      {
        loading
          ? <Loader2Icon className="animate-spin" />
          : <SparklesIcon />
      }
      Создать через Zoom
    </Button>
  )
}
