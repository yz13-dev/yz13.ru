"use client";

import { Background, Node, ReactFlow } from "@xyflow/react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { types } from "./node-types";
import useNodeStore, { NodeStore } from "./store/nodes.store";

type NodesMapProps = {
  nodes: Node[];
};

const selector = (state: NodeStore) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});

const NodesMap = ({ nodes: provided = [] }: NodesMapProps) => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setNodes } =
    useNodeStore(useShallow(selector));
  useEffect(() => {
    if (provided) setNodes(provided);
  }, [provided]);
  console.log(nodes, edges);
  return (
    <ReactFlow
      nodeTypes={types}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onlyRenderVisibleElements
    >
      <Background />
    </ReactFlow>
  );
};

export default NodesMap;
