import User from "@/app/(root)/(public)/user";
import "@xyflow/react/dist/base.css";
import Dock from "../../dock";
import { Info, Nav, Status } from "../../header";
import NodesMap from "../../node-map";

const page = () => {
  return (
    <div className="w-full h-dvh relative">
      <Nav />
      <Status />
      <Info>
        <User />
      </Info>
      <Dock />
      <NodesMap
        nodes={[
          {
            type: "account",
            id: "1",
            position: { x: 100, y: 100 },
            data: { value: 100 },
          },
          {
            type: "payment",
            id: "2",
            position: { x: 300, y: 300 },
            data: { value: 100 },
          },
        ]}
      />
    </div>
  );
};

export default page;
