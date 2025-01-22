"use server";

import dayjs from "dayjs";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const getChannels = async () => {
  try {
    const cookieStore = cookies();
    const client = createClient(cookieStore);
    const channels = client.getChannels();
    return channels;
  } catch (error) {
    return [];
  }
};

export const joinChannel = async (channel: string) => {
  try {
    const cookieStore = cookies();
    const client = createClient(cookieStore);
    const {
      data: { user },
    } = await client.auth.getUser();
    const userId = user?.id;
    if (!userId) return null;
    const room = client.channel(channel, {
      config: {
        presence: {
          key: userId,
        },
      },
    });
    return room.subscribe(async (status) => {
      if (status !== "SUBSCRIBED") return;
      else {
        const date = dayjs().unix();
        await room.track({
          online_at: date,
        });
      }
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getChannel = async (channel: string) => {
  try {
    const cookieStore = cookies();
    const client = createClient(cookieStore);
    const {
      data: { user },
    } = await client.auth.getUser();
    const userId = user?.id;
    if (!userId) return null;
    const room = client.channel(channel, {
      config: {
        presence: {
          key: userId,
        },
      },
    });
    return room;
  } catch (error) {
    console.error(error);
    return null;
  }
};
