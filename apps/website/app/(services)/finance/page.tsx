import { Background, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import { Nav, Status, Info } from "./header";
import Dock from "./dock";

const page = () => {
  return (
    <div className="w-full h-dvh relative">
      <Nav />
      <Status />
      <Info />
      <Dock />
      <ReactFlow>
        <Background />
      </ReactFlow>
    </div>
  );
};

export default page;
