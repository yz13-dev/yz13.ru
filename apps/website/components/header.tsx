import { getAvailability } from "@/flags";
import { Button } from "@yz13/ui/button";
import { ButtonGroup } from "@yz13/ui/button-group";
import { cn } from "@yz13/ui/cn";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@yz13/ui/drawer";
import { BookTextIcon, BriefcaseBusinessIcon, EllipsisIcon, FolderIcon } from "@yz13/ui/icons";
import Link from "next/link";
import ContactForm from "./contact-form";
import ExtraMenu from "./extra-menu";
import { ThemeImage } from "./theme-image";

export default async function Header() {

  const isAvailable = await getAvailability();

  return (
    <header
      className={cn(
        "flex items-center container justify-between gap-4 mx-auto",
        "*:py-6 sticky top-0 bg-background z-20 rounded-xl",
      )}
    >
      <div className="pl-6">
        <div className="h-10 flex items-center">
          <Link href="/" className="lg:block hidden">
            <ThemeImage
              className="max-h-10 w-fit"
              srcDark="/logo/dark-full.png"
              srcLight="/logo/light-full.png"
              width={250}
              height={40}
              alt="logo"
            />
          </Link>
          <Link href="/" className="lg:hidden block">
            <ThemeImage
              className="max-h-10 w-fit"
              srcDark="/logo/dark.png"
              srcLight="/logo/light.png"
              width={40}
              height={40}
              alt="logo"
            />
          </Link>
        </div>
      </div>
      <nav
        className={cn(
          "pr-6 flex items-center gap-3",
          "[&>button]:h-10 [&>button]:text-base",
          "[&>a]:h-10 [&>a]:text-base",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-1.5",
            "[&>button]:h-10 [&>button]:text-base",
            "[&>a]:h-10 [&>a]:text-base",
          )}
        >
          <ButtonGroup className="*:h-10 *:text-base">
            <Button variant="outline" asChild>
              <Link href="/projects">
                <FolderIcon />
                <span className="lg:inline hidden">Проекты</span>
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/works">
                <BriefcaseBusinessIcon />
                <span className="lg:inline hidden">Работы</span>
              </Link>
            </Button>
          </ButtonGroup>
          <Button variant="outline" asChild>
            <Link href="/blog">
              <BookTextIcon />
              <span className="lg:inline hidden">Блог</span>
            </Link>
          </Button>
        </div>
        <Drawer>
          <DrawerTrigger asChild disabled={!isAvailable}>
            <Button variant="default">Связаться</Button>
          </DrawerTrigger>
          <DrawerContent className="max-w-2xl mx-auto border-x px-6">
            <DrawerHeader className="px-0">
              <DrawerTitle className="text-start text-2xl">Что вы хотите сделать?</DrawerTitle>
              <DrawerDescription className="text-start text-lg">Выберите один из предложенных вариантов</DrawerDescription>
            </DrawerHeader>
            <ContactForm />
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">
              <EllipsisIcon />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-w-2xl pb-6 mx-auto border-x px-6">
            <ExtraMenu />
          </DrawerContent>
        </Drawer>
      </nav>
    </header>
  );
}
