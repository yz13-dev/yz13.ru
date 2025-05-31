import { StoreProvider } from "./api/api-provider";
import Canvas from "./components/canvas";
import Dock from "./components/dock";
import Sidebar from "./components/sidebar";

export default async function page() {
  return (
    <StoreProvider>
      <div className="w-full h-dvh">
        <Canvas options={{ grid: true }} />
        <Sidebar />
        <Dock />
        {/* <WelcomeScreen /> */}
      </div>
    </StoreProvider>
  );
}
