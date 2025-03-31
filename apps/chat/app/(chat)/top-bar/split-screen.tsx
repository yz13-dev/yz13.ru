import { Button } from "mono/components/button";
import { SquareSplitHorizontalIcon, TableColumnsSplitIcon } from "lucide-react";

const SplitScreen = () => {
  return (
    <Button variant="outline" size="icon" className="gap-2 rounded-md text-xs">
      <SquareSplitHorizontalIcon size={18} />
    </Button>
  );
};

export default SplitScreen;
