"use client";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  EllipsisIcon,
  NavigationIcon,
  RulerIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { setLat, setLng } from "./map.store";

const Overlay = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();
  const getUserCoords = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords);
        const { latitude, longitude } = position.coords;
        router.push(`/maps?lat=${latitude}&lng=${longitude}`);
        setLat(latitude);
        setLng(longitude);
      },
      (err) => {
        console.log(err);
      },
    );
  };
  return (
    <>
      {children}
      <div className="absolute left-0 top-0 w-fit p-4">
        <div className="flex flex-row items-center gap-1 p-1 rounded-lg bg-background relative">
          <Button size="icon" className="shrink-0" variant="ghost" asChild>
            <Link href="/">
              <ArrowLeftIcon size={18} />
            </Link>
          </Button>
          <Input placeholder="Поиск" className="w-64" />
          <Button
            size="icon"
            className="shrink-0 px-1 w-fit absolute -right-8"
            variant="secondary"
          >
            <ChevronLeftIcon size={18} />
          </Button>
        </div>
      </div>
      <div className="absolute right-0 top-0 w-fit p-4 flex items-center gap-2">
        <div className="flex flex-row items-center gap-1 p-1 rounded-lg bg-background">
          <Button
            size="icon"
            onClick={getUserCoords}
            className="shrink-0"
            variant="ghost"
          >
            <NavigationIcon size={18} />
          </Button>
        </div>
        <div className="flex flex-row items-center gap-1 p-1 rounded-lg bg-background">
          <Button size="icon" className="shrink-0" variant="ghost">
            <RulerIcon size={18} />
          </Button>
          <Button size="icon" className="shrink-0" variant="ghost">
            <EllipsisIcon size={18} />
          </Button>
        </div>
        <div className="flex flex-row items-center gap-1 p-1 rounded-lg bg-background">
          <div className="size-9 rounded-full border" />
        </div>
      </div>
    </>
  );
};
export default Overlay;
