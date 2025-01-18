import PuzzleCanvas from "./canvas";

type PageProps = {
  params: {
    id: string;
  };
};
const page = ({ params }: PageProps) => {
  const id = params.id;
  return (
    <div className="w-full h-dvh relative">
      <span className="absolute top-6 left-6 text-foreground text-sm px-2 py-1 rounded-md bg-background-back borders">
        {id}
      </span>
      <PuzzleCanvas imageSrc="/puzzle/example-1.jpg" />
    </div>
  );
};

export default page;
