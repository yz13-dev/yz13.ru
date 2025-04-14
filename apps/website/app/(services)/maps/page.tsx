import dynamic from "next/dynamic";
import Overlay from "./overlay";

const Map = dynamic(() => import("./map"), {});

type PageProps = {
  searchParams: Promise<{
    lat?: string;
    lng?: string;
  }>;
};

const page = async ({ searchParams }: PageProps) => {
  const { lat = "57.152988", lng = "65.541228" } = await searchParams;
  const searchLat = parseFloat(lat)
  const searchLng = parseFloat(lng)
  return (
    <div className="w-full h-dvh overflow-hidden relative">
      <Overlay>
        <Map lat={searchLat} lng={searchLng} />
      </Overlay>
    </div>
  );
};

export default page;
