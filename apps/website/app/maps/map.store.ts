import { create } from "zustand";

type State = {
  lat: number;
  lng: number;
  zoom: number;
};

type Actions = {
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
  setZoom: (zoom: number) => void;
};

const useMapStore = create<State & Actions>()((set) => ({
  lat: 57.152988,
  lng: 65.541228,
  zoom: 15,
  setLat: (lat: number) => set({ lat }),
  setLng: (lng: number) => set({ lng }),
  setZoom: (zoom: number) => set({ zoom }),
}));

const getLat = () => useMapStore.getState().lat;
const getLng = () => useMapStore.getState().lng;
const getZoom = () => useMapStore.getState().zoom;

const setLat = (lat: number) => useMapStore.getState().setLat(lat);
const setLng = (lng: number) => useMapStore.getState().setLng(lng);
const setZoom = (zoom: number) => useMapStore.getState().setZoom(zoom);

export { getLat, getLng, getZoom, setLat, setLng, setZoom };

export default useMapStore;
