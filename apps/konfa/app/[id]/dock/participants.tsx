"use client";

import { Button } from "mono/components/button";
import { useRoomApi } from "../room-api/api-provider";
import { UserIcon } from "lucide-react";

export default function Participants() {
  const participants = useRoomApi((state) => state.participants);
  return (
    <Button variant="outline">
      <UserIcon size={16} />
      <span>{participants.length}/10</span>
    </Button>
  );
}
