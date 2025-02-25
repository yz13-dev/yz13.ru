import { create } from "zustand";
import { chartData } from "./chart.data";

export type ChartData = {
  label: string;
  count: number;
};

type Chart = Record<string, ChartData[]>;

type State = {
  currentChart: string;
  charts: Chart;
};
type Actions = {
  setCurrentChart: (current: string) => void;
  setCharts: (charts: Chart) => void;
};

const useCharts = create<State & Actions>()((set) => ({
  currentChart: "views",
  setCurrentChart: (current: string) => set({ currentChart: current }),
  charts: chartData,
  setCharts: (charts: Chart) => set({ charts }),
}));

export default useCharts;
