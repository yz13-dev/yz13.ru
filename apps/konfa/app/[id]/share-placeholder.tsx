import { useTimeout } from "ahooks";
import { UserPlusIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { useState } from "react";

type SharePlaceholderProps = {
  id: string;
};
export default function SharePlaceholder({ id }: SharePlaceholderProps) {
  const url = `https://konfa.yz13.ru/${id}`;
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const handleCopy = async () => {
    const url = `https://konfa.yz13.ru/app/${id}`;
    setLoading(true);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useTimeout(
    () => {
      if (copied) setCopied(false);
    },
    copied ? 1000 : undefined,
  );
  return (
    <div className="w-full h-full border overflow-hidden rounded-lg flex flex-col items-center justify-center gap-4">
      <div className="relative size-14 rounded-full overflow-visible border-2 flex items-center justify-center">
        <div className="size-[336px] rounded-full border border-border/20 absolute" />
        <div className="size-[280px] rounded-full border border-border/40 absolute" />
        <div className="size-[224px] rounded-full border border-border/60 absolute" />
        <div className="size-[168px] rounded-full border border-border/80 absolute" />
        <div className="size-[112px] rounded-full border border-border/100 absolute" />
        <UserPlusIcon size={24} />
      </div>
      <div className="z-10 *:block space-y-2 max-w-md">
        <span className="text-center text-base font-medium">
          Поделитесь ссылкой для начала конференции
        </span>
        <span className="text-center text-sm textg text-secondary">
          К конференции может подключиться любой пользователей, который имеет
          ссылку.
        </span>
      </div>
      <div className="flex z-10 *:bg-background w-fit">
        <div className="px-3 w-fit h-9 py-2 rounded-l-md border">
          <span className="text-sm">{url.slice(0, 30)}...</span>
        </div>
        <Button
          onClick={handleCopy}
          disabled={copied ?? loading}
          variant="outline"
          className="rounded-l-none"
        >
          {loading ? "Копирование..." : copied ? "Скопировано" : "Копировать"}
        </Button>
      </div>
    </div>
  );
}
