"use client";

import { NewEvent } from "rest-api/types/calendar";

export default function NewEventForm({ uid }: { uid: string }) {
  const handleNewEvent = async () => {
    const event: NewEvent = {
      dtstart: new Date().toISOString(),
      uid,
      summary: "New event",
    };
  };
  return <></>;
}
