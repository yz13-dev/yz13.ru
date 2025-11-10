import { Button } from "@yz13/ui/button";
import { DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@yz13/ui/drawer";
import { ArrowRightIcon, MailIcon, UserIcon } from "@yz13/ui/icons";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@yz13/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@yz13/ui/radio-group";
import { Separator } from "@yz13/ui/separator";
import { Textarea } from "@yz13/ui/textarea";




export default function ContactForm() {
  return (
    <>
      <DrawerHeader className="px-0">
        <DrawerTitle className="text-start text-2xl">Что вы хотите сделать?</DrawerTitle>
        <DrawerDescription className="text-start text-lg">Выберите один из предложенных вариантов</DrawerDescription>
      </DrawerHeader>
      <div className="space-y-6">
        <RadioGroup defaultValue="r1">
          <div className="w-full grid grid-cols-2 gap-4">

            <div className="size-full border has-data-[state=checked]:border-foreground p-4 flex flex-row items-center gap-2 rounded-xl">
              <RadioGroupItem value="r1" />
              <div className="flex flex-col">
                <span className="font-medium">Заказать проект</span>
                <span className="text-muted-foreground">Чтобы начать новый проект</span>
              </div>
            </div>

            <div className="size-full border has-data-[state=checked]:border-foreground p-4 flex flex-row items-center gap-2 rounded-xl">
              <RadioGroupItem value="r2" />
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
        <Textarea rows={7} placeholder="Ваше сообщение..." className="text-base! p-4" />
      </div>
      <DrawerFooter className="flex-row flex px-0 items-center justify-between">
        <div className="">

        </div>
        <Button className="w-fit"><span>Отправить</span><ArrowRightIcon /></Button>
      </DrawerFooter>
    </>
  )
}
