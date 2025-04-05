"use client";

import { useEffect } from "react";
import { UserObject } from "rest-api/types/user";
import { createClient } from "yz13/supabase/client";
import { useRoomApi } from "./api-provider";
import { Participant } from "../participant";
import { getChannel } from "./channel";

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
  const updateParticipant = useRoomApi((state) => state.updateParticipant);
  const deleteParticipant = useRoomApi((state) => state.deleteParticipant);
  const setCurrent = useRoomApi((state) => state.setCurrent);
  const getRoomChannel = () => {
    return getChannel({ id, uid });
  };
  const handleUpdateParticipant = (participant: Participant) => {
    if (!participant.user) return;
    updateParticipant(participant);
    if (participant.user.id === uid) {
      setCurrent(participant);
    }
  };
  const handleDeleteParticipant = (id: string) => {
    deleteParticipant(id);
    if (id === uid) {
      setCurrent(null);
    }
  };
  const handleParticipant = (participant: Participant) => {
    if (!participant.user) return;
    addParticipant(participant);
    if (participant.user.id === uid) {
      setCurrent(participant);
    }
  };
  useEffect(() => {
    const channel = getRoomChannel();
    channel
      .on("broadcast", { event: "mute" }, ({ event, type, payload }) => {
        // console.log(event, "payload: ", payload);
        if (payload.user) {
          const participant = payload as Participant;
          handleUpdateParticipant(participant);
        }
      })
      .on("broadcast", { event: "camera" }, ({ event, type, payload }) => {
        // console.log(event, "payload: ", payload);
        if (payload.user) {
          const participant = payload as Participant;
          handleUpdateParticipant(participant);
        }
      })
      .on("presence", { event: "join" }, ({ newPresences }) => {
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
        // console.log("join presence state: ", state);
      })
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState<Participant>();
        const keys = Object.keys(state);
        keys.forEach((key) => {
          const participantArr = state[key];
          if (participantArr && participantArr.length !== 0) {
            const participant = participantArr[0];
            if (participant) {
              handleUpdateParticipant(participant);
            }
          }
        });
        console.log("synced presence state: ", state);
      })
      .on("presence", { event: "leave" }, () => {
        const state = channel.presenceState<Participant>();
        const keys = Object.keys(state);
        keys.forEach((key) => {
          const participantArr = state[key];
          if (participantArr && participantArr.length !== 0) {
            const participant = participantArr[0];
            if (participant) {
              handleDeleteParticipant(participant.user.id);
            }
          }
        });
        // console.log("leave presence state: ", state);
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
