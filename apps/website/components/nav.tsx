import AppLogo from "@/app/[appId]/components/app-logo";
import { getV1Store } from "@yz13/api";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from "@yz13/ui/components/menubar";
import { AlbumIcon, FolderIcon, ListTreeIcon } from "lucide-react";



export default async function () {

  const publications = await getV1Store();

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
      {
        false &&
        <MenubarMenu>
          <MenubarTrigger className="gap-2">
            <ListTreeIcon size={16} />
            <span className="lg:inline hidden">Решения</span>
          </MenubarTrigger>
          <MenubarContent side="top">
            <MenubarItem>
              Решение #1 <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Решение #2 <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Решение #3 <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Решение #4 <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Решение #5 <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      }
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
