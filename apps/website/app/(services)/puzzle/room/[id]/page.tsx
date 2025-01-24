import Canvas from "@/components/canvas/canvas";
import Overlay from "@/components/canvas/overlay";

type PageProps = {
  params: {
    id: string;
  };
};
const page = ({ params }: PageProps) => {
  const id = params.id;
  return (
    <div className="w-full h-dvh relative">
      <Overlay>
        <span className="absolute top-6 left-6 text-foreground text-sm px-2 py-1 rounded-md bg-background-back borders">
          {id}
        </span>
        <Canvas options={{ grid: true }} />
      </Overlay>
    </div>
  );
};

export default page;
