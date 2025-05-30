import { StoreProvider } from "./api/api-provider";
import Canvas from "./components/canvas";

export default async function page() {
  return (
    <div className="w-full h-dvh">
      <aside className="absolute top-0 left-0 p-4 space-y-4"></aside>
      <StoreProvider>
        <Canvas options={{ grid: true }} />
      </StoreProvider>
    </div>
  );
}
