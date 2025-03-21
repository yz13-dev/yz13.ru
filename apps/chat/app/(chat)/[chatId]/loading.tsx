import { Loader2Icon } from "lucide-react";

const loading = () => {
  return (
    <div className="w-full h-[calc(100dvh-56px)] flex flex-col items-center justify-center gap-4 px-4">
      <Loader2Icon size={20} className="animate-spin" />
    </div>
  );
};

export default loading;
