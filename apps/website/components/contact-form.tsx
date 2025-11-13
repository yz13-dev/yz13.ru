"use client";
import { email, telegram } from "@/const/socials";
import { Button } from "@yz13/ui/button";
import { DrawerFooter } from "@yz13/ui/drawer";
import { ArrowRightIcon, FilesIcon, MailIcon, UserIcon } from "@yz13/ui/icons";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@yz13/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@yz13/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@yz13/ui/select";
import { Separator } from "@yz13/ui/separator";
import { Textarea } from "@yz13/ui/textarea";
import Link from "next/link";
import { useState } from "react";

export default function ContactForm() {
  const [value, setValue] = useState<string>("project");

  return (
    <>
      <div className="space-y-6">
        <RadioGroup
          defaultValue="project"
          value={value}
          onValueChange={setValue}
        >
          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="size-full border has-data-[state=checked]:border-foreground p-4 flex flex-row items-center gap-3 rounded-xl">
              <RadioGroupItem value="project" />
              <div className="flex flex-col">
                <span className="font-medium">Заказать проект</span>
                <span className="text-muted-foreground">
                  Чтобы начать новый проект
                </span>
              </div>
            </div>

            <div className="size-full border has-data-[state=checked]:border-foreground p-4 flex flex-row items-center gap-3 rounded-xl">
              <RadioGroupItem value="question" />
              <div className="flex flex-col">
                <span className="font-medium">Задать вопросы</span>
                <span className="text-muted-foreground">Если есть такие</span>
              </div>
            </div>
          </div>
        </RadioGroup>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <InputGroup className="h-10">
            <InputGroupAddon>
              <UserIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Имя" className="text-base!" />
          </InputGroup>
          <InputGroup className="h-10">
            <InputGroupAddon>
              <MailIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Почта" className="text-base!" />
          </InputGroup>
        </div>
        <Textarea
          rows={7}
          placeholder="Ваше сообщение..."
          className="text-base! p-4"
        />

        {value === "project" && (
          <>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Выберите бюджет проекта" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low-1">До 100 тысяч рублей</SelectItem>
                <SelectItem value="low-2">
                  От 100 до 250 тысяч рублей
                </SelectItem>
                <SelectItem value="low-3">
                  От 250 до 500 тысяч рублей
                </SelectItem>
                <SelectItem value="medium-1">
                  От 500 до 750 тысяч рублей
                </SelectItem>
                <SelectItem value="medium-2">
                  От 750 тысяч до 1 млн рублей
                </SelectItem>
                <SelectItem value="high-1">От 1 млн рублей</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="secondary">
              <FilesIcon />
              <span>Прикрепить файлы</span>
            </Button>
          </>
        )}
      </div>
      <DrawerFooter className="flex-row flex px-0 items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">
            Или можете сразу написать
          </span>
          <div className="flex items-center gap-2">
            <Link
              href={`mailto:${email}`}
              className="text-sm text-foreground hover:underline"
            >
              На почту
            </Link>
            <span className="text-sm text-muted-foreground">или</span>
            <Link
              href={telegram}
              className="text-sm text-foreground hover:underline"
            >
              Телеграм
            </Link>
          </div>
        </div>
        <Button className="w-fit">
          <span>Отправить</span>
          <ArrowRightIcon />
        </Button>
      </DrawerFooter>
    </>
  );
}
