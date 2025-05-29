import { StoreProvider } from "./api/api-provider";
import Canvas from "./components/canvas";

export default async function page() {
  return (
    <div className="w-full h-dvh">
      <StoreProvider>
        <Canvas options={{ grid: true }} />
      </StoreProvider>
    </div>
  );
}
