import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from "@yz13/ui/components/menubar";
import { AlbumIcon, FolderIcon, ListTreeIcon } from "lucide-react";



export default function () {
  return (
    <Menubar className="bg-background/40">
      <MenubarMenu>
        <MenubarTrigger className="gap-2">
          <FolderIcon size={16} />
          Проекты
        </MenubarTrigger>
        <MenubarContent side="top">
          <MenubarItem>
            Проект #1 <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Проект #2 <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Проект #3 <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Проект #4 <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Проект #5 <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="gap-2">
          <ListTreeIcon size={16} />
          Решения
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
      <MenubarMenu>
        <MenubarTrigger className="gap-2">
          <AlbumIcon size={16} />
          Ресурсы
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
    </Menubar>
  )
}
