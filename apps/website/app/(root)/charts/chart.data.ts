import { ChartData } from "./charts.store";

export const chartData: Record<string, ChartData[]> = {
  views: [
    { label: "2024-09", count: 0 },
    { label: "2024-10", count: 25 },
    { label: "2024-11", count: 150 },
    { label: "2024-12", count: 200 },
    { label: "2025-01", count: 235 },
    { label: "2025-02", count: 160 },
  ],
  projects: [
    { label: "2024-09", count: 0 },
    { label: "2024-10", count: 2 },
    { label: "2024-11", count: 2 },
    { label: "2024-12", count: 1 },
    { label: "2025-01", count: 1 },
    { label: "2025-02", count: 0 },
  ],
};
