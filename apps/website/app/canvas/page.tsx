import { ChevronLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";
import Canvas from "./canvas";

const page = () => {
  return (
    <div className="w-full h-dvh relative">
      <Button variant="ghost" size="icon" className="absolute left-4 top-4">
        <Link href="/" className="w-fit h-fit">
          <ChevronLeftIcon size={18} />
        </Link>
      </Button>
      <Canvas />
    </div>
  );
};

export default page;
