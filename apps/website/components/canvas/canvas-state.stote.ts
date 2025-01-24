import { create } from "zustand";

type StoreActions = {
  setIsMovingCanvas: (isMovingCanvas: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
  setIsDragging: (isDragging: boolean) => void;
  setIsRotating: (isRotating: boolean) => void;
  setIsDropping: (isDropping: boolean) => void;
};

type Store = {
  isMovingCanvas: boolean;
  isEditing: boolean;
  isDragging: boolean;
  isRotating: boolean;
  isDropping: boolean;
};

const useCanvasStateStore = create<Store & StoreActions>((set) => ({
  isMovingCanvas: false,
  isEditing: false,
  isDragging: false,
  isRotating: false,
  isDropping: false,
  setIsMovingCanvas: (isMovingCanvas: boolean) => set({ isMovingCanvas }),
  setIsDragging: (isDragging: boolean) => set({ isDragging }),
  setIsEditing: (isEditing: boolean) => set({ isEditing }),
  setIsRotating: (isRotating: boolean) => set({ isRotating }),
  setIsDropping: (isDropping: boolean) => set({ isDropping }),
}));

export const setIsMovingCanvas = (isMovingCanvas: boolean) =>
  useCanvasStateStore.setState({ isMovingCanvas });

export default useCanvasStateStore;
