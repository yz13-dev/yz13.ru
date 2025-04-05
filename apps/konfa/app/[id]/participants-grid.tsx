"use client";
import { cn } from "yz13/cn";
import { Participant, ParticipantVideo } from "./participant";
import { useEffect, useMemo, useState } from "react";
import { useRoomApi } from "./room-api/api-provider";
import SharePlaceholder from "./share-placeholder";

export default function ParticipantsGrid({ id }: { id: string }) {
  const participants = useRoomApi((state) => state.participants);
  const focusedOn = useRoomApi((state) => state.focusedOn);
  const setFocusedOn = useRoomApi((state) => state.setFocusedOn);
  const [toShow, setToShow] = useState<Participant[]>([]);
  useEffect(() => {
    if (focusedOn) return setToShow(participants.slice(0, 5));
    else return setToShow(participants);
  }, [focusedOn, participants]);
  return (
    <div
      className={cn(
        "grid h-fit max-h-full gap-2 *:w-full *:h-full w-full min-h-64 *:aspect-video",
        focusedOn
          ? "auto-rows-fr grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          : participants.length <= 3 && "grid-cols-2",
        participants.length >= 3 &&
          "auto-rows-fr grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      )}
    >
      {toShow.map((participant, index) => {
        const isPinned = focusedOn === participant.user.id;
        return (
          <ParticipantVideo
            key={participant.user.id}
            id={participant.user.id}
            participant={participant}
            isPinned={isPinned}
            onPin={setFocusedOn}
          />
        );
      })}
      <SharePlaceholder id={id} />
    </div>
  );
}
