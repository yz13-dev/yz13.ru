import { XYPosition } from "@xyflow/react";

export type Account = {
  type: "account";
  position: XYPosition;
  value: number;
  id: string;
};

export type Transaction = {
  from: string; // id
  to: string; // id
  value: number;
};
