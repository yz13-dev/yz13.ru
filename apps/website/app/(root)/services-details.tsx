import { get } from "@vercel/edge-config";
import { CheckIcon, LucideIcon, PlusIcon } from "lucide-react";
import { Separator } from "mono/components/separator";
import { cn } from "yz13/cn";

const Details = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-72 shrink-0 space-y-3 p-3 hover:bg-neutral-100 transition-colors",
        className,
      )}
    >
      {children}
    </div>
  );
};

const DetailsHeader = ({
  title = "",
  price = "",
}: {
  title?: string;
  price?: string;
}) => {
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <div className="flex flex-row items-center gap-2">
        <div className="size-4 rounded-full bg-neutral-300" />
        <span className="font-medium line-clamp-1">{title}</span>
      </div>
      <span className="text-foreground shrink-0 font-semibold">{price}</span>
    </div>
  );
};

const DetailsDescription = ({ children }: { children?: React.ReactNode }) => {
  return <span className="text-secondary text-sm">{children}</span>;
};

type DetailsExtra = {
  icon?: LucideIcon;
  label?: string;
  price?: string;
};

const DetailsExtraList = ({ list = [] }: { list?: DetailsExtra[] }) => {
  return (
    <ul className="w-full space-y-2">
      {list.map(({ icon: Icon, label, price }, index) => {
        return (
          <li className="w-full" key={`${label}-${index}`}>
            <div className="flex flex-row justify-between items-center gap-2">
              <div className="w-fit text-secondary flex items-center justify-between gap-2">
                {Icon && <Icon size={16} />}
                <span className="text-secondary text-sm">{label}</span>
              </div>
              {price && (
                <span className="text-secondary text-sm">+{price}</span>
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
        title="Страницы"
        price={`${price.toLocaleString()}${sign}+`}
      />
      <DetailsDescription>
        Хороший вариант для начальной стадии сотрудничества.
      </DetailsDescription>
      <Separator />
      <DetailsExtraList
        list={[
          {
            label: "Доп. поправки",
            icon: PlusIcon,
            price: "0",
          },
          {
            label: "Доп. страницы",
            icon: PlusIcon,
            price: "0",
          },
          {
            label: "Доступ к репозиторию с исходным кодом",
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
      <DetailsHeader title="Сайт" price={`${price.toLocaleString()}${sign}+`} />
      <DetailsDescription>
        3+ страничный сайт на основе выбранных технологий.
      </DetailsDescription>
      <Separator />
      <DetailsExtraList
        list={[
          {
            label: "Доп. поправки",
            icon: PlusIcon,
            price: "0",
          },
          {
            label: "Доп. страницы",
            icon: PlusIcon,
            price: "0",
          },
          {
            label: "Доступ к репозиторию с исходным кодом",
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
        title="Веб приложение"
        price={`${price.toLocaleString()}${sign}+`}
      />
      <DetailsDescription>"{"web-app-description"}"</DetailsDescription>
      <Separator />
      <DetailsExtraList
        list={[
          {
            label: "Доп. поправки",
            icon: PlusIcon,
            price: "0",
          },
          {
            label: "Доступ к репозиторию с исходным кодом",
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
      <DetailsHeader title="MVP" price={`${price.toLocaleString()}${sign}+`} />
      <DetailsDescription>{"mvp-description"}</DetailsDescription>
      <Separator />
      <DetailsExtraList
        list={[
          {
            label: "Доступ к репозиторию с исходным кодом",
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
