import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { cn } from "yz13/cn";
import icons from "../icons";
import useWorkspaceStore from "../store/workspace.store";

export type PaymentNode = Node<
  {
    value: number;
  },
  "payment"
>;

const Payment = (props: NodeProps<PaymentNode>) => {
  const { type, data, selected } = props;
  const workspace = useWorkspaceStore((state) => state.workspace);
  const value = data.value;
  const Icon = icons[type];
  return (
    <div
      className={cn(
        "w-80 rounded-xl bg-background border p-3 flex flex-col gap-2",
        selected && "ring-1 outline-none ring-offset-2 ring-foreground",
      )}
    >
      <div className="flex items-center gap-2">
        <Icon size={18} />
        <span>{type}</span>
      </div>
      <span className="text-sm">
        Значение: {value}
        {workspace?.currencySign}
      </span>
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

export default Payment;
