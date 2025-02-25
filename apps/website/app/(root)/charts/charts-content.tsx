"use client";
import { useMemo } from "react";
import Chart from "./chart";
import useCharts from "./charts.store";

const ChartsContent = ({ useChartData }: { useChartData?: boolean }) => {
  const chart = useCharts((state) => state.currentChart);
  const chartData = useCharts((state) => state.charts);

  const data = useMemo(() => chartData[chart], [chartData, chart]);

  if (chart === "views") return <Chart label="Посетители" data={data} />;
  if (chart === "projects") return <Chart label="Проекты" data={data} />;
  return <></>;
};

export default ChartsContent;
