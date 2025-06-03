import { getStatusLabel } from "@/const/status-map";
import { auth } from "@/lib/auth";
import { format, parseISO } from "date-fns";
import { ArrowLeftIcon, CalendarIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventById } from "rest-api/calendar";
import CallCalendar from "./call-calendar";
import StatusButton from "./status-button";
import UserBadge from "./user-badge";

type PageProps = {
  params: Promise<{
    callId: string;
  }>;
  searchParams: Promise<{
    continue?: string;
  }>;
}
export default async function page({ params, searchParams }: PageProps) {
  const { callId } = await params;
  const { continue: continueLink } = await searchParams;

  const { data: call } = await getEventById(callId);

  const user = await auth()

  if (!user) return notFound();
  if (!call) return notFound();

  const organizer = call.organizer_id;
  const guests = call.guests ?? [];

  const isGuest = user.id !== organizer && guests.includes(user.id);

  const isAuthorizedUserNotAllowed = user.id !== organizer && !guests.includes(user.id);

  if (isAuthorizedUserNotAllowed) return notFound();

  const shortId = callId.slice(0, 6)

  const startAt = parseISO(call.date_start)
  const endAt = parseISO(call.date_end);

  const startTime = format(startAt, "HH:mm");
  const endTime = format(endAt, "HH:mm");

  const GUESTS_LIMIT = 3
  const isGuestsMoreThanLimit = guests.length > GUESTS_LIMIT;
  const guestsLimit = isGuestsMoreThanLimit ? guests.slice(0, GUESTS_LIMIT) : guests;

  const status = call.status ?? "TENTATIVE";
  const isCancelled = call.status === "CANCELLED";

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
          {
            isCancelled
              ? <span className="text-sm text-muted-foregroundextmu">Событие отменено</span>
              :
              isGuest && status === "TENTATIVE"
                ? <StatusButton callId={callId} status={"CONFIRMED"} />
                : <StatusButton callId={callId} status={call.status ?? "TENTATIVE"} />
          }
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
                <p className="lg:text-base text-xs text-muted-foreground">{call.summary}</p>
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
              <UserBadge userId={organizer} showName />
              <div className="-space-y-2 *:inline">
                {
                  guestsLimit
                    .map(guest => <UserBadge userId={guest} key={guest} />)
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
          {
            call.url &&
            <div className="space-y-0">
              <span className="text-base block font-medium">Ссылка</span>
              <Link href={call.url} target="_blank" className="text-sm inline-flex gap-1 items-center hover:underline text-muted-foreground line-clamp-1">
                {call.url}
                <ExternalLinkIcon size={12} />
              </Link>
            </div>
          }
        </div>
      </div>
    </>
  )
}
