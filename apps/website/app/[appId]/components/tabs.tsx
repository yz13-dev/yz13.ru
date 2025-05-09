"use client";
import { Tabs, TabsList, TabsTrigger } from "mono/components/tabs";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  id: string;
};

const tabs = [
  {
    name: "Главная",
    href: "",
  },
  {
    name: "Экраны",
    href: "screens",
  },
];

const withId = (id: string, tab: string) => {
  const path = tab ? `/${id}/${tab}` : `/${id}`;
  return path;
};

export default function ({ id }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const changeTab = (tab: string) => {
    router.push(tab);
  };
  const rootTab = `/${id}`;
  return (
    <Tabs defaultValue={rootTab} value={pathname} onValueChange={changeTab}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.href} value={withId(id, tab.href)}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
