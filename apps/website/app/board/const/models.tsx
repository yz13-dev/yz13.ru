import { CircleIcon, MinusIcon, SquareIcon, TriangleIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { Element } from "../api/api";

export type DockModel = {
  code: Element["code"];
  icon: ReactNode,
  group: string | null;
}

export const models: DockModel[] = [
  {
    code: "rectangle",
    icon: <SquareIcon size={16} />,
    group: "shapes",
  },
  {
    code: "circle",
    icon: <CircleIcon size={16} />,
    group: "shapes",
  },
  {
    code: "triangle",
    icon: <TriangleIcon size={16} />,
    group: "shapes",
  },
  {
    code: "line",
    icon: <MinusIcon size={16} />,
    group: "lines",
  },
];

export const makeGroups = (models: DockModel[]) => {
  const groups: Record<string, DockModel[]> = {};
  for (const model of models) {
    if (!model.group) continue;
    if (!groups[model.group]) {
      groups[model.group] = [];
    }
    const group = groups[model.group];
    if (group) group.push(model);
  };
  return groups;
};

export const getGroup = (group: string, models: DockModel[]) => {
  return makeGroups(models)[group] ?? [];
};

export default models;
