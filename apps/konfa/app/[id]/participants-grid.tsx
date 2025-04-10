"use client";
import { cn } from "yz13/cn";
import { Participant, ParticipantVideo } from "./participant";
import { useEffect, useMemo, useState } from "react";
import { useRoomApi } from "./room-api/api-provider";
import SharePlaceholder from "./share-placeholder";
import {
  useLocalStream,
  useRemoteStreams,
  useStreamActions,
} from "./room-api/streamStore";
import { StreamVideo } from "./stream-video";

export default function ParticipantsGrid({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  const participants = useRoomApi((state) => state.participants);
  const focusedOn = useRoomApi((state) => state.focusedOn);
  const setFocusedOn = useRoomApi((state) => state.setFocusedOn);
  const [toShow, setToShow] = useState<Participant[]>([]);
  const [me, setMe] = useState<Participant>();
  useEffect(() => {
    const me = participants.find((p) => p.user.id === userId);
    if (me) setMe(me);
  }, [participants]);
  useEffect(() => {
    const excludeMe = participants.filter((p) => p.user.id !== userId);
    if (focusedOn) return setToShow(excludeMe.slice(0, 5));
    else return setToShow(excludeMe);
  }, [focusedOn, participants]);
  const remoteStreams = useRemoteStreams();
  const localStream = useLocalStream();
  const { addStream, setLocalStream, cleanup } = useStreamActions();
  const streamsEntries = useMemo(() => {
    return Object.entries(remoteStreams);
  }, [remoteStreams]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setLocalStream(stream);
        // Для демонстрации: добавляем локальный поток в UI (опционально)
        addStream(userId, stream);
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });

    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
      cleanup();
    };
  }, []);
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
      {me && localStream && (
        <StreamVideo stream={localStream} userId={userId} isLocal />
      )}
      {toShow.map((participant, index) => {
        const isPinned = focusedOn === participant.user.id;
        const target = streamsEntries.find(
          ([id]) => id === participant.user.id,
        );
        return (
          <ParticipantVideo
            key={participant.user.id}
            id={participant.user.id}
            participant={participant}
            isPinned={isPinned}
            onPin={setFocusedOn}
          >
            {target && (
              <StreamVideo
                key={id}
                stream={target[1].stream}
                userId={participant.user.id}
              />
            )}
          </ParticipantVideo>
        );
      })}
      <SharePlaceholder id={id} />
    </div>
  );
}
