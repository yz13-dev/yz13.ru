"use client";

import { useEffect } from "react";
import { UserObject } from "rest-api/types/user";
import { createClient } from "yz13/supabase/client";
import { useRoomApi } from "./api-provider";
import { Participant } from "../participant";

type ParticipantsObserver = {
  id: string;
  uid: string;
  user: UserObject;
};
export default function ParticipantsObserver({
  id,
  uid,
  user,
}: ParticipantsObserver) {
  const addParticipant = useRoomApi((state) => state.addParticipant);
  const getChannel = () => {
    const client = createClient();
    const channelName = `konfa/room/${id}`;
    const channel = client.channel(channelName, {
      config: {
        presence: {
          key: uid,
        },
      },
    });
    return channel;
  };
  const handleParticipant = (participant: Participant) => {
    addParticipant(participant);
  };
  useEffect(() => {
    const channel = getChannel();
    channel
      .on("presence", { event: "join" }, () => {
        const state = channel.presenceState<Participant>();
        const keys = Object.keys(state);
        keys.forEach((key) => {
          const participantArr = state[key];
          if (participantArr && participantArr.length !== 0) {
            const participant = participantArr[0];
            if (participant) {
              const prepared: Participant = {
                ...participant,
                isHost: false,
                isMuted: true,
                isVideoOff: true,
              };
              handleParticipant(prepared);
            }
          }
        });
        console.log("join presence state: ", channel.presenceState());
      })
      .on("presence", { event: "sync" }, () => {
        console.log("Synced presence state: ", channel.presenceState());
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ joined_at: new Date().toISOString(), user });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);
  return null;
}
