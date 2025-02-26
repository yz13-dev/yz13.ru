"use client";
import { Logo } from "@/components/logo";
import User from "@/components/user";
import { BookmarkIcon, NavigationIcon } from "lucide-react";
import { Marker } from "maplibre-gl";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { Separator } from "mono/components/separator";
import { motion } from "motion/react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import useMapStore, { setLat, setLng } from "./map.store";

const Overlay = ({ children }: { children?: ReactNode }) => {
  // const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const locationStream = useMapStore((state) => state.locationStream);
  const setLocationStream = useMapStore((state) => state.setLocationStream);
  const map = useMapStore((state) => state.map);
  const [marker, setMarker] = useState<Marker | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [streamLoading, setStreamLoading] = useState<boolean>(false);

  useEffect(() => {
    const geo = navigator.geolocation;
    if (locationStream) {
      setStreamLoading(true);
      const id = geo.watchPosition(
        (position) => {
          // console.log(position.coords);
          const { latitude, longitude } = position.coords;
          // router.push(`/maps?lat=${latitude}&lng=${longitude}`);
          setLat(latitude);
          setLng(longitude);
          setStreamLoading(false);
          if (map) {
            map.flyTo({ center: [longitude, latitude], zoom: 18 });
            const marker = new Marker()
              .setLngLat([longitude, latitude])
              .addTo(map);
            setMarker(marker);
          }
        },
        (err) => {
          console.log(err);
          setStreamLoading(false);
          setLocationStream(false);
        },
      );
      setWatchId(id);
    } else {
      if (watchId) geo.clearWatch(watchId);
      marker?.remove();
      setMarker(null);
    }
  }, [locationStream, map]);
  return (
    <>
      {children}
      <div className="absolute left-0 top-0 w-fit p-4 flex items-center gap-2">
        <div className="flex flex-row items-center gap-1 py-1 px-2 rounded-lg bg-background">
          <Link href="/">
            <Logo size={{ width: 36, height: 36 }} type="only-icon" />
          </Link>
        </div>
      </div>
      <div className="absolute right-0 top-0 w-fit p-4 flex items-center gap-2">
        <div className="flex flex-row items-center gap-1 p-1 rounded-lg bg-background">
          <User />
        </div>
      </div>
      <motion.div
        onClick={() => setOpen(!open)}
        initial={{ width: "36rem", bottom: "-5rem" }}
        whileHover={{ width: "36rem", bottom: "0" }}
        animate={
          open
            ? { width: "36rem", bottom: "0" }
            : { width: "36rem", bottom: "-5rem" }
        }
        layoutId="overlay-box"
        className="absolute left-0 right-0 flex max-w-full h-fit mx-auto flex-col z-20"
      >
        <div className="gap-4 flex-col flex p-4 rounded-t-3xl items-center bg-background">
          <div className="flex w-full flex-row items-center gap-2">
            <Input placeholder="Поиск" className="w-full" />
            <Button
              onClick={() => setLocationStream(!locationStream)}
              variant={locationStream ? "default" : "secondary"}
              className="shrink-0"
              size="icon"
            >
              <NavigationIcon size={16} />
            </Button>
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
        </div>
      </motion.div>
    </>
  );
};
export default Overlay;
