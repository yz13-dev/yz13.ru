"use client";

import AutoTextarea from "@/components/auto-textarea";
import { Logo } from "@/components/logo";
import { useDebounceEffect } from "ahooks";
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Drawer, DrawerContent } from "mono/components/drawer";
import { Input } from "mono/components/input";
import { Label } from "mono/components/label";
import { RadioGroup, RadioGroupItem } from "mono/components/radio-group";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isDev } from "../login/get-url";
import User from "../user";

const ContactForm = ({ noRedirect }: { noRedirect?: boolean }) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const [text, setText] = useState("");
  useDebounceEffect(
    () => {
      if (!open) setOpen(true);
    },
    [open],
    { wait: 1000 },
  );
  return (
    <Drawer
      defaultOpen
      open={open}
      onOpenChange={setOpen}
      onClose={() => {
        if (!noRedirect) router.back();
      }}
    >
      <DrawerContent className="space-y-6 *:px-6 pb-6 h-fit max-w-lg mx-auto overflow-y-auto after:hidden rounded-t-2xl">
        <div className="gap-2 flex items-center w-full justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={{ width: 32, height: 32 }} />
            <span className="text-foreground text-xl font-pixel font-semibold">
              YZ13
            </span>
          </Link>
          {isDev && <User />}
        </div>

        <p className="text-base font-medium">Готовы начать сотрудничать?</p>

        <p className="text-sm text-secondary">
          Напишите нам на почту или в телеграм сообщение о предложении или
          задании.
        </p>
        <div className="w-full flex items-center gap-4 *:text-secondary *:text-sm">
          <Link href="mailto:info@yz13.dev" className="flex items-center gap-2">
            Mail
            <ExternalLinkIcon size={13} />
          </Link>
          <Link href="https://t.me/yz13dev" className="flex items-center gap-2">
            Telegram
            <ExternalLinkIcon size={13} />
          </Link>
        </div>

        <div className="w-full">
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-secondary">
              Или воспользуйтесь формой ниже
            </span>
          </div>
        </div>

        <div className="w-full space-y-4">
          <Input placeholder="Ваш email" />

          <AutoTextarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ваше предложение"
            className="p-2 max-h-48 h-fit shrink-0 rounded-lg border w-full"
          />

          <div className="flex flex-col gap-2">
            <p className="text-sm text-secondary">
              Для контекста, выберите один вариантов ниже:
            </p>
            <RadioGroup defaultValue="solo">
              <div className="w-full flex items-center gap-3 p-2 rounded-lg border relative">
                <div className="w-24 aspect-video relative rounded-lg border flex items-center justify-center flex-row">
                  <div className="size-9  bg-background rounded-full border" />
                </div>
                <div className="flex h-full py-1.5 space-y-1 flex-col">
                  <Label htmlFor="r-solo" className="text-sm">
                    Один
                  </Label>
                  <span className="text-xs text-secondary">Просто один</span>
                </div>
                <RadioGroupItem
                  value="solo"
                  id="r-solo"
                  className="absolute top-2 right-2"
                />
              </div>
              <div className="w-full flex items-center gap-3 p-2 rounded-lg border relative">
                <div className="w-24 aspect-video relative rounded-lg border flex items-center justify-center flex-row">
                  <div className="size-9 absolute bottom-1.5 left-2 rounded-full border" />
                  <div className="size-9 absolute bottom-1.5 right-2 rounded-full border" />
                  <div className="size-9 z-10 absolute top-1 bg-background rounded-full border" />
                </div>
                <div className="flex h-full py-1.5 space-y-1 flex-col">
                  <Label htmlFor="r-team" className="text-sm">
                    Команда
                  </Label>
                  <span className="text-xs text-secondary">
                    Я часть команды
                  </span>
                </div>
                <RadioGroupItem
                  value="team"
                  id="r-team"
                  className="absolute top-2 right-2"
                />
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-row gap-2 !mt-12">
            <Button variant="outline" size="icon" className="shrink-0" asChild>
              <Link href="/">
                <ArrowLeftIcon size={16} />
              </Link>
            </Button>
            <Button className="w-full">Отправить</Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ContactForm;
