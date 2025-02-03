import { Map as MaplibreMap } from "maplibre-gl";
import { create } from "zustand";

type State = {
  lat: number;
  lng: number;
  zoom: number;
  locationStream: boolean;
  map: MaplibreMap | null;
};

type Actions = {
  setMap: (map: MaplibreMap | null) => void;
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
  setLocationStream: (locationStream: boolean) => void;
  setZoom: (zoom: number) => void;
};

const useMapStore = create<State & Actions>()((set) => ({
  map: null,
  lat: 57.152988,
  lng: 65.541228,
  locationStream: false,
  zoom: 15,
  setLat: (lat: number) => set({ lat }),
  setLng: (lng: number) => set({ lng }),
  setZoom: (zoom: number) => set({ zoom }),
  setLocationStream: (locationStream: boolean) => set({ locationStream }),
  setMap: (map: MaplibreMap | null) => set({ map }),
}));

const getLat = () => useMapStore.getState().lat;
const getLng = () => useMapStore.getState().lng;
const getZoom = () => useMapStore.getState().zoom;
const getMap = () => useMapStore.getState().map;
const getLocationStream = () => useMapStore.getState().locationStream;

const setLat = (lat: number) => useMapStore.getState().setLat(lat);
const setLng = (lng: number) => useMapStore.getState().setLng(lng);
const setZoom = (zoom: number) => useMapStore.getState().setZoom(zoom);
const setMap = (map: MaplibreMap | null) => useMapStore.getState().setMap(map);
const setLocationStream = (locationStream: boolean) =>
  useMapStore.getState().setLocationStream(locationStream);

export {
  getLat,
  getLng,
  getLocationStream,
  getMap,
  getZoom,
  setLat,
  setLng,
  setLocationStream,
  setMap,
  setZoom,
};

export default useMapStore;
