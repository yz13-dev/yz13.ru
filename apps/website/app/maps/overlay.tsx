"use client";
import { BookmarkIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { Separator } from "mono/components/separator";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { setLat, setLng } from "./map.store";

const Overlay = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
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
      <div className="absolute right-0 top-0 w-fit p-4 flex items-center gap-2">
        <div className="flex flex-row items-center gap-1 p-1 rounded-lg bg-background">
          <div className="size-9 rounded-full border" />
        </div>
      </div>
      <motion.div
        onClick={() => setOpen(!open)}
        initial={{ width: "24rem", bottom: "-5rem" }}
        whileHover={{ width: "36rem", bottom: "0" }}
        animate={
          open
            ? { width: "36rem", bottom: "0" }
            : { width: "24rem", bottom: "-5rem" }
        }
        layoutId="overlay-box"
        className="absolute left-0 right-0 gap-4 flex max-w-full flex-col h-fit mx-auto p-4 rounded-t-3xl items-center bg-background z-20"
      >
        <div className="flex w-full flex-row items-center gap-2">
          <Input placeholder="Поиск" className="w-full" />
          <Button variant="secondary" size="icon" className="shrink-0">
            <BookmarkIcon size={18} />
          </Button>
        </div>
        <Separator />
        <div className="flex flex-row items-center gap-2">
          <button className="size-12 rounded-xl border"></button>
          <button className="size-12 rounded-xl border"></button>
          <button className="size-12 rounded-xl border"></button>
        </div>
      </motion.div>
    </>
  );
};
export default Overlay;
