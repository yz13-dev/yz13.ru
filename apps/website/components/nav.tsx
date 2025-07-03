import AppLogo from "@/app/[appId]/components/app-logo";
import { icons } from "@/const/pricing-icons";
import { get } from "@vercel/edge-config";
import { getV1PricingShort, getV1Store } from "@yz13/api";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from "@yz13/ui/components/menubar";
import { AlbumIcon, FolderIcon, ListTreeIcon, StoreIcon } from "lucide-react";



export default async function () {

  const [publications, pricing] = await Promise.all([
    getV1Store(),
    getV1PricingShort()
  ]);

  const sign = (await get<string>("price-sign")) ?? "₽";


  return (
    <Menubar className="bg-background/40">
      <MenubarMenu>
        <MenubarTrigger className="gap-2">
          <FolderIcon size={16} />
          <span className="lg:inline hidden">Проекты</span>
        </MenubarTrigger>
        <MenubarContent side="top">
          {
            publications.map((publication) => {
              return (
                <MenubarItem key={publication.id}>
                  <div className="size-5 shrink-0 flex items-center justify-center rounded-full relative overflow-hidden">
                    <AppLogo publication={publication} />
                  </div>
                  {publication.name}
                  {/* <MenubarShortcut>⌘{index}</MenubarShortcut> */}
                </MenubarItem>
              )
            })
          }
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="gap-2">
          <ListTreeIcon size={16} />
          <span className="lg:inline hidden">Решения</span>
        </MenubarTrigger>
        <MenubarContent side="top">
          {
            pricing
              .sort((a, b) => a.price - b.price)
              .map((pricing) => {

                const type = pricing.type as keyof typeof icons;
                const icon = type ? icons[type] : <StoreIcon />;

                console.log(type, icon)

                return (
                  <MenubarItem key={pricing.id}>
                    {icon}
                    {pricing.name}
                    <MenubarShortcut>От {pricing.price.toLocaleString()}{sign}</MenubarShortcut>
                  </MenubarItem>
                )
              })
          }
        </MenubarContent>
      </MenubarMenu>
      {
        false &&
        <MenubarMenu>
          <MenubarTrigger className="gap-2">
            <AlbumIcon size={16} />
            <span className="lg:inline hidden">Ресурсы</span>
          </MenubarTrigger>
          <MenubarContent side="top">
            <MenubarItem>
              Ресурс #1 <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Ресурс #2 <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Ресурс #3 <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Ресурс #4 <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Ресурс #5 <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      }
    </Menubar>
  )
}
