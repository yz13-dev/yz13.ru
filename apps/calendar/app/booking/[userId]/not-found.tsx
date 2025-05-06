"use client";
import { ArrowLeftIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="w-full h-dvh flex flex-col gap-6 items-center justify-center">
      <span className="text-2xl font-medium">Такого пользователя нет</span>
      <div className="flex flex-row gap-2">
        <Button>
          <ArrowLeftIcon size={16} />
          Вернуться
        </Button>
        <Button variant="outline" onClick={() => router.refresh()}>
          <RefreshCwIcon size={16} />
          Обновить
        </Button>
      </div>
    </div>
  );
}
