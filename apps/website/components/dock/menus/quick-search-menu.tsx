import { Input } from "mono/components/input";
import MenuWrapper from "./menu-wrapper";

const QuickSearchMenu = () => {
  return (
    <MenuWrapper>
      <Input placeholder="Что ищете?" className="w-full" />
    </MenuWrapper>
  );
};

export default QuickSearchMenu;
