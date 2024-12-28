"use client";
import { NodeProps } from "@xyflow/react";
import { Button } from "mono/components/button";
import { AccountNode } from "./nodes/account.node";

const Toolbar = (props: NodeProps<AccountNode>) => {
  return (
    <div
      id="toolbar"
      className="absolute w-fit -top-16 flex items-center gap-2 p-1 rounded-lg bg-background-back"
    >
      <Button variant="ghost" size="icon" className="size-6 p-1">
        1
      </Button>
    </div>
  );
};

export default Toolbar;
