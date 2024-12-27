import { Background, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import { Nav, Status, Info } from "./header";
import Dock from "./dock";
import { types } from "./node-types";

const page = () => {
  return (
    <div className="w-full h-dvh relative">
      <Nav />
      <Status />
      <Info />
      <Dock />
      <ReactFlow
        nodeTypes={types}
        nodes={[
          {
            type: "account",
            id: "1",
            position: { x: 100, y: 100 },
            data: { value: 100 },
          },
        ]}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default page;
