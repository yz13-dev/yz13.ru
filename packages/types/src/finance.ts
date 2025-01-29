import { XYPosition } from "@xyflow/react";

type Account = {
  type: "account";
  position: XYPosition;
  value: number;
  id: string;
};

type Transaction = {
  from: string; // id
  to: string; // id
  value: number;
};
