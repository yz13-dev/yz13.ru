import dynamic from "next/dynamic";
import Overlay from "./overlay";

const Map = dynamic(() => import("./map"), { ssr: false });

type PageProps = {
  searchParams: {
    lat?: string;
    lng?: string;
  };
};

const page = ({ searchParams }: PageProps) => {
  const lat = searchParams.lat ? parseFloat(searchParams.lat) : 57.152988;
  const lng = searchParams.lng ? parseFloat(searchParams.lng) : 65.541228;
  return (
    <div className="w-full h-dvh overflow-hidden relative">
      <Overlay>
        <Map lat={lat} lng={lng} />
      </Overlay>
    </div>
  );
};

export default page;
