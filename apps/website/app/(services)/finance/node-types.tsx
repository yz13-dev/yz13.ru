"use client";
import { NodeTypes } from "@xyflow/react";
import Account, { AccountNode } from "./nodes/account.node";
import Payment, { PaymentNode } from "./nodes/payment.node";

export const types: NodeTypes = {
  account: Account,
  payment: Payment,
};
export type NodeType = AccountNode["type"] | PaymentNode["type"];
