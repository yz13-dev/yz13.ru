import { Loader2Icon } from "lucide-react";

const loading = () => {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <Loader2Icon size={24} className="animate-spin" />
    </div>
  );
};

export default loading;
