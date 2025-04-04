import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { ArrowRightIcon } from "lucide-react";

export default function page() {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <div className="max-w-6xl w-full grid md:grid-cols-2 grid-cols-1 *:p-6">
        <div className="w-full h-full *:block space-y-6">
          <h1 className="text-4xl font-semibold">
            Видеозвонки и встречи для всех
          </h1>
          <p className="text-lg text-secondary">
            Konfa обеспечивает видеосвязь для совместной работы и развлечений –
            где бы вы ни находились.
          </p>
        </div>
        <div className="w-full h-full space-y-6">
          <div className="flex items-start gap-3">
            <Button className="shrink-0">Новая встреча</Button>
            <div className="flex w-full flex-col gap-1.5 items-end">
              <Input placeholder="abcd-efgh-jk" />
              <Button className="w-fit gap-2" variant="ghost">
                Присоединиться
                <ArrowRightIcon size={16} />
              </Button>
            </div>
          </div>
          <span className="text-lg block text-secondary">
            Если у вас есть код для встречи, вы можете присоединиться к ней,
            введя код в поле. Также вы можете создать свою встречу.
          </span>
        </div>
      </div>
    </div>
  );
}
