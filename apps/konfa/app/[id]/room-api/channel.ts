import { createClient } from "yz13/supabase/client";

export const getChannel = ({ id, uid }: { id: string; uid: string }) => {
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
