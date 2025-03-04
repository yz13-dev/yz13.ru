"use client";

import { getUserById } from "@/actions/user/user";
import { useUser } from "@/lib/use-auth";
import dayjs from "dayjs";
import { useEffect } from "react";
import { createClient } from "yz13/supabase/client";
import { getUser, setUser } from "./multiplayer.api";

export type MultiplayerProps = {
  roomId: string;
  prefix?: string;
};
const Multiplayer = ({ prefix = "room", roomId }: MultiplayerProps) => {
  const [user, loading] = useUser();
  const getChannelId = () => `${prefix}:${roomId}`;
  useEffect(() => {
    if (loading) return;
    if (!user) return;
    setUser(user);
  }, [user, loading]);
  const handleUser = async (userId: string) => {
    const usr = getUser(userId);
    if (usr) return;
    const retrievedUser = await getUserById(userId);
    if (retrievedUser) setUser(retrievedUser);
  };
  useEffect(() => {
    const supabase = createClient();
    const channelId = getChannelId();
    const userId = user?.id;
    if (!userId) return;
    const channel = supabase.channel(channelId, {
      config: {
        presence: {
          key: userId,
        },
      },
    });
    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const keys = Object.keys(state);
        console.log(state, keys);
        keys.forEach((key) => {
          handleUser(key);
        });
      })
      .subscribe(async (status) => {
        console.log(status);
        if (status === "SUBSCRIBED") {
          await channel.track({ online_at: dayjs().toISOString() });
        }
      });
    return () => {
      channel.unsubscribe();
    };
  }, [user?.id]);

  return <></>;
};

export default Multiplayer;
