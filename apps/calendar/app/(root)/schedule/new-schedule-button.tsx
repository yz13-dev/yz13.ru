"use client";
import { createSchedule } from "@yz13/api/calendar/schedule";
import { Button } from "@yz13/ui/components/button";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ({ uid, calendarId }: { uid: string | null, calendarId?: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const disabled = !uid || loading || !calendarId;
  const router = useRouter();
  const handleNewSchedule = async () => {
    if (!uid) return;
    if (!calendarId) return;
    try {
      setLoading(true);
      const schedule = await createSchedule(uid, calendarId);
      if (schedule) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button disabled={disabled} onClick={handleNewSchedule}>
      {loading && <Loader2Icon size={16} className="animate-spin" />}
      Создать расписание
    </Button>
  );
}
