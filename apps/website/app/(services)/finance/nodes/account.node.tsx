import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { cn } from "yz13/cn";

export type AccountNode = Node<
  {
    value: number;
  },
  "account"
>;

const Account = (props: NodeProps<AccountNode>) => {
  const { type, data, selected } = props;
  const value = data.value;
  return (
    <div
      className={cn(
        "w-80 rounded-xl bg-background border p-3 flex flex-col gap-2",
        selected && "ring-1 outline-none ring-offset-2 ring-foreground",
      )}
    >
      <span>{type}</span>
      <span className="text-sm">Значение: {value}</span>
      <Handle
        type="target"
        className={cn(
          "size-3 rounded-full",
          selected && "ring-1 outline-none ring-offset-2 ring-foreground",
        )}
        position={Position.Right}
      />
      <Handle
        type="source"
        className={cn(
          "size-3 rounded-full",
          selected && "ring-1 outline-none ring-offset-2 ring-foreground",
        )}
        position={Position.Left}
      />
    </div>
  );
};

export default Account;
