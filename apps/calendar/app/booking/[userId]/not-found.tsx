import { ArrowLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";

export default function NotFound() {
  return (
    <div className="w-full h-dvh flex flex-col gap-6 items-center justify-center">
      <span className="text-2xl font-medium">Такого пользователя нет</span>
      <Button>
        <ArrowLeftIcon size={16} />
        Вернуться
      </Button>
    </div>
  );
}
