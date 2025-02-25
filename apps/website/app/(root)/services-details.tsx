import { get } from "@vercel/edge-config";
import {
  AppWindowIcon,
  CheckIcon,
  GlobeIcon,
  LucideIcon,
  PanelTopIcon,
  PlusIcon,
  SparklesIcon,
} from "lucide-react";
import { Separator } from "mono/components/separator";
import { cn } from "yz13/cn";

const Details = ({
  children,
  className = "",
  active = false,
}: {
  children?: React.ReactNode;
  className?: string;
  active?: boolean;
}) => {
  return (
    <div
      className={cn(
        "w-80 shrink-0 relative space-y-3 p-4 hover:bg-neutral-100 transition-colors",
        "last:border-r group",
        active && "bg-neutral-100",
        className,
      )}
    >
      {children}
    </div>
  );
};

const DetailsHeader = ({
  icon,
  title = "",
  price = "",
}: {
  icon?: React.ReactNode;
  title?: string;
  price?: string;
}) => {
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <div className="flex flex-row items-center gap-1">
        {icon && (
          <div className="size-6 flex items-center justify-center">{icon}</div>
        )}
        <span className="font-medium relative line-clamp-1">{title}</span>
      </div>
      <span className="text-foreground shrink-0 font-semibold px-2 py-0 bg-secondary/10 rounded-full border">
        {price}
      </span>
    </div>
  );
};

const DetailsDescription = ({ children }: { children?: React.ReactNode }) => {
  return <span className="text-secondary block text-sm">{children}</span>;
};

type ExtraSingleItem = {
  type: "single";
};
type ExtraPerItem = {
  type: "per-item";
  per_item_label?: string;
  price_per_item?: number;
};

type DetailsExtra = {
  icon?: LucideIcon;
  label?: string;
  price?: number;
} & (ExtraSingleItem | ExtraPerItem);

const DetailsExtraList = async ({ list = [] }: { list?: DetailsExtra[] }) => {
  const sign = await get<string>("price-sign");
  return (
    <ul className="w-full space-y-2">
      {list
        .sort((a, b) => {
          if (a.type === "single" && b.type === "per-item") return 1;
          if (a.type === "per-item" && b.type === "single") return -1;
          return 0;
        })
        .map((item, index) => {
          const { icon: Icon, label, price, type } = item;
          return (
            <li className="w-full" key={`${label}-${index}`}>
              <div className="flex flex-row justify-between items-center gap-2 text-secondary group-hover:text-foreground/80 hover:text-foreground">
                <div className="w-fit flex items-center justify-between gap-2">
                  {Icon && <Icon size={16} className="shrink-0" />}
                  <span className="text-sm">{label}</span>
                </div>
                {type === "single" && price && (
                  <span className="text-sm">
                    +{(price ?? 0).toLocaleString()}
                    {sign}
                  </span>
                )}
                {type === "per-item" && item.price_per_item && (
                  <span className="text-sm">
                    +{(item.price_per_item ?? 0).toLocaleString()}
                    {sign}/{item.per_item_label ?? "шт"}
                  </span>
                )}
              </div>
            </li>
          );
        })}
    </ul>
  );
};

const PagesDetails = async () => {
  const sign = await get<string>("price-sign");
  const priceObj = await get<{ [key: string]: number }>("prices");
  const price = priceObj?.["landing-page"] ?? 0;
  return (
    <Details>
      <DetailsHeader
        icon={<PanelTopIcon size={18} />}
        title="Страницы"
        price={`${price.toLocaleString()}${sign}+`}
      />
      <DetailsDescription>
        Хороший вариант для начальной стадии сотрудничества. Верстаю адаптивные
        и быстрые страницы, готовые к интеграции в проект.
      </DetailsDescription>
      <Separator />
      <DetailsExtraList
        list={[
          {
            type: "single",
            label: "Разработка интерактивных элементов",
            icon: PlusIcon,
            price: 2500,
          },
          {
            type: "per-item",
            label: "Доп. страницы",
            icon: PlusIcon,
            price_per_item: 1500,
          },
          {
            type: "single",
            label: "Доступ к репозиторию с исходным кодом",
            icon: CheckIcon,
          },
          {
            type: "single",
            label: "Настройка базового SEO",
            icon: CheckIcon,
          },
          {
            type: "single",
            label: "Оптимизация под мобильные устройства",
            icon: CheckIcon,
          },
        ]}
      />
    </Details>
  );
};

const WebsiteDetails = async () => {
  const sign = await get<string>("price-sign");
  const priceObj = await get<{ [key: string]: number }>("prices");
  const price = priceObj?.["website"] ?? 0;
  return (
    <Details>
      <DetailsHeader
        icon={<GlobeIcon size={18} />}
        title="Сайт"
        price={`${price.toLocaleString()}${sign}+`}
      />
      <DetailsDescription>
        Идеальное решение, если нужен полностью готовый сайт. Разработаю проект
        с нуля, учту все пожелания и технические требования.
      </DetailsDescription>
      <Separator />
      <DetailsExtraList
        list={[
          {
            type: "per-item",
            label: "Доп. страницы",
            icon: PlusIcon,
            price_per_item: 1500,
          },
          {
            type: "single",
            label: "Создание мультиязычного интерфейса",
            icon: PlusIcon,
            price: 6000,
          },
          {
            type: "single",
            label: "Доступ к репозиторию с исходным кодом",
            icon: CheckIcon,
          },
          {
            type: "single",
            label: "Настройка базового SEO",
            icon: CheckIcon,
          },
        ]}
      />
    </Details>
  );
};

const WebAppDetails = async () => {
  const sign = await get<string>("price-sign");
  const priceObj = await get<{ [key: string]: number }>("prices");
  const price = priceObj?.["web-app"] ?? 0;
  return (
    <Details>
      <DetailsHeader
        icon={<AppWindowIcon size={18} />}
        title="Веб приложение"
        price={`${price.toLocaleString()}${sign}+`}
      />
      <DetailsDescription>
        Для тех, кто хочет интерактивный сервис с продвинутой логикой. Подходит
        для личных кабинетов, дашбордов, карт и других сложных решений.
      </DetailsDescription>
      <Separator />
      <DetailsExtraList
        list={[
          {
            type: "per-item",
            label: "Доп. страницы/разделы",
            icon: PlusIcon,
            price_per_item: 2000,
          },
          {
            type: "single",
            label: "Разработка real-time функционала",
            icon: PlusIcon,
            price: 10000,
          },
          {
            type: "single",
            label: "Разработка Progressive Web App (PWA) с оффлайн-режимом",
            icon: PlusIcon,
            price: 9000,
          },
          {
            type: "single",
            label: "Доступ к репозиторию с исходным кодом",
            icon: CheckIcon,
          },
          {
            type: "single",
            label: "Настройка базового SEO",
            icon: CheckIcon,
          },
        ]}
      />
    </Details>
  );
};

const MVPDetails = async () => {
  const sign = await get<string>("price-sign");
  const priceObj = await get<{ [key: string]: number }>("prices");
  const price = priceObj?.["mvp"] ?? 0;
  return (
    <Details>
      <DetailsHeader
        icon={<SparklesIcon size={18} />}
        title="MVP"
        price={`${price.toLocaleString()}${sign}+`}
      />
      <DetailsDescription>
        Оптимальный выбор, если нужно быстро протестировать идею. Сделаю
        минимальную, но рабочую версию продукта для первых пользователей.
      </DetailsDescription>
      <Separator />
      <DetailsExtraList
        list={[
          {
            type: "per-item",
            label: "Доп. ключевые функции",
            icon: PlusIcon,
            price_per_item: 5000,
          },
          {
            type: "single",
            label: "Доступ к репозиторию с исходным кодом",
            icon: CheckIcon,
          },
          {
            type: "single",
            label: "Настройка базового SEO",
            icon: CheckIcon,
          },
          {
            type: "single",
            label: "Интеграция API",
            icon: CheckIcon,
          },
          {
            type: "single",
            label: "Документация по основным возможностям",
            icon: CheckIcon,
          },
        ]}
      />
    </Details>
  );
};

const ServicesDetails = async () => {
  const sign = await get<string>("price-sign");
  const priceObj = await get<{ [key: string]: number }>("prices");
  const price = priceObj?.["landing-page"] ?? 0;
  return (
    <div className="w-full">
      <div className="max-w-screen-2xl w-full mx-auto border-x flex flex-row divide-x overflow-x-auto">
        <PagesDetails />
        <WebsiteDetails />
        <WebAppDetails />
        <MVPDetails />
      </div>
    </div>
  );
};

export default ServicesDetails;
