import { isDev } from "@yz13/supabase/env";
import { redirect } from "next/navigation";
import { StoreProvider } from "./api/api-provider";
import Canvas from "./components/canvas";
import Dock from "./components/dock";
import Sidebar from "./components/sidebar";

export default async function page() {
  const randomId = Math.random().toString(36).substring(2, 15);
  if (!isDev) return redirect("/")
  return (
    <StoreProvider>
      <div className="w-full h-dvh">
        <Canvas options={{ grid: true }} />
        <Sidebar id={randomId} />
        <Dock />
        {/* <WelcomeScreen /> */}
      </div>
    </StoreProvider>
  );
}
