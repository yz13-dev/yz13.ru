import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { getEventById } from "rest-api/calendar/events";
import Form from "./form";

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

  const identities = user.identities ?? [];

  const hasZoomIdentity = !!(identities.find((identity) => identity.provider === "zoom"));

  const organizer = call.organizer_id;
  const guests = call.guests ?? [];

  const isGuest = user.id !== organizer && guests.includes(user.id);

  const isAuthorizedUserNotAllowed = user.id !== organizer && !isGuest;

  if (isAuthorizedUserNotAllowed) return notFound();

  console.log(call)

  return <Form
    call={call}
    callId={callId}
    userId={user.id}
    continueLink={continueLink}
    withZoom={hasZoomIdentity}
  />
}
