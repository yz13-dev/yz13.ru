import { Button } from "mono/components/button";
import { SquareSplitHorizontalIcon, TableColumnsSplitIcon } from "lucide-react";

const SplitScreen = () => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="gap-2 h-8 rounded-md text-xs"
    >
      <SquareSplitHorizontalIcon size={16} />
    </Button>
  );
};

export default SplitScreen;
