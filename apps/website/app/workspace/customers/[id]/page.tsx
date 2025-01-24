import { BriefcaseIcon, MailIcon, PhoneIcon, StarIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "mono/components/tabs";

const page = () => {
  return (
    <div className="w-full flex lg:!flex-row flex-col gap-4">
      <div className="lg:!w-1/3 w-full h-fit space-y-8">
        <div className="space-y-4">
          <span className="text-xl font-medium inline-flex gap-2 items-center text-foreground">
            <StarIcon size={16} className="shrink-0 size-4" />
            Customer name
          </span>

          <ul className="w-full space-y-2">
            <li>
              <span className="text-sm inline-flex gap-2 items-center text-foreground">
                <PhoneIcon size={16} />
                (000) 000-0000
              </span>
            </li>
            <li>
              <span className="text-sm inline-flex gap-2 items-center text-foreground">
                <MailIcon size={16} />
                user.test@yz13.ru
              </span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-3 min-h-20 gap-2 *:border *:rounded-xl *:p-2">
          <div>
            <span className="font-medium text-lg block">$0</span>
            <span className="text-sm text-secondary">Заказов на сумму</span>
          </div>
          <div>
            <span className="font-medium text-lg block">$0</span>
            <span className="text-sm text-secondary">Средняя стоимость</span>
          </div>
          <div>
            <span className="font-medium text-lg block">0</span>
            <span className="text-sm text-secondary">Всего заказов</span>
          </div>
        </div>

        <div>
          <span className="text-sm font-medium">Текущие заказы</span>
          <ul className="w-full *:py-4 divide-y">
            <li>
              <div className="flex items-start gap-2 justify-between">
                <div className="flex w-fit items-start gap-4">
                  <div className="flex rounded-lg border items-center justify-center size-10">
                    <BriefcaseIcon size={24} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-0">
                      <span className="font-medium">Заказ №1</span>
                      <span className="text-sm text-secondary">
                        Описание заказа
                      </span>
                    </div>
                    <span className="text-xs text-secondary">Вчера</span>
                  </div>
                </div>
                <span className="text-lg font-medium">$0</span>
              </div>
            </li>
            <li>
              <div className="flex items-start gap-2 justify-between">
                <div className="flex w-fit items-start gap-4">
                  <div className="flex rounded-lg border items-center justify-center size-10">
                    <BriefcaseIcon size={24} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-0">
                      <span className="font-medium">Заказ №1</span>
                      <span className="text-sm text-secondary">
                        Описание заказа
                      </span>
                    </div>
                    <span className="text-xs text-secondary">Вчера</span>
                  </div>
                </div>
                <span className="text-lg font-medium">$0</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="lg:!w-2/3 w-full h-fit">
        <nav className="w-full h-fit flex items-center justify-center gap-2">
          <Tabs defaultValue="activities">
            <TabsList className="!rounded-b-none">
              <TabsTrigger value="activities">Взаимодействие</TabsTrigger>
              <TabsTrigger value="projects">Работы</TabsTrigger>
              <TabsTrigger value="invoices">Выплаты</TabsTrigger>
            </TabsList>
          </Tabs>
        </nav>
        <div className="w-full h-full flex flex-col gap-4 border rounded-xl"></div>
      </div>
    </div>
  );
};

export default page;
