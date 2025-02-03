"use client";
import { Map as MaplibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import useMapStore, { setLocationStream } from "./map.store";

type MapProps = {
  lat?: number;
  lng?: number;
  zoom?: number;
  disabled?: boolean;
};

const Map = ({ disabled = false }: MapProps) => {
  const isDark = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
  const container = useRef<HTMLDivElement>(null);
  const lat = useMapStore((state) => state.lat);
  const lng = useMapStore((state) => state.lng);
  const zoom = useMapStore((state) => state.zoom);
  const setLat = useMapStore((state) => state.setLat);
  const setLng = useMapStore((state) => state.setLng);
  const setZoom = useMapStore((state) => state.setZoom);
  const API_KEY = process.env.NEXT_PUBLIC_PROTON_MAP_API_KEY;
  const map = useMapStore((state) => state.map);
  const setMap = useMapStore((state) => state.setMap);

  useEffect(() => {
    if (map) {
      if (isDark) {
        map.setStyle(
          `https://api.protomaps.com/styles/v4/dark/ru.json?key=${API_KEY}`,
        );
      } else
        map.setStyle(
          `https://api.protomaps.com/styles/v4/light/ru.json?key=${API_KEY}`,
        );
    }
  }, [isDark, map]);
  useEffect(() => {
    const map = new MaplibreMap({
      container: "map",
      style: `https://api.protomaps.com/styles/v4/light/ru.json?key=${API_KEY}`,
      maplibreLogo: false,
      interactive: !disabled,
      center: [lng, lat],
      zoom: zoom,
    });
    map.on("move", (ev) => {
      const { lng, lat } = ev.target.getCenter();
      // console.log(lng, lat);
      setLat(lat);
      setLng(lng);
      setLocationStream(false);
    });
    map.on("zoom", (ev) => {
      const zoom = ev.target.getZoom();
      // console.log(zoom);
      setZoom(zoom);
    });
    setMap(map);
    return () => {
      map.remove();
      setMap(null);
    };
  }, []);
  return <div id="map" ref={container} className="w-full h-dvh" />;
};

export default Map;
