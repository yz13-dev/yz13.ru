"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "mono/components/select";
import useCharts from "./charts.store";

const ChartSelector = () => {
  const chart = useCharts((state) => state.currentChart);
  const setChart = useCharts((state) => state.setCurrentChart);
  return (
    <Select defaultValue="views" value={chart} onValueChange={setChart}>
      <SelectTrigger className="bg-background w-48 z-30">
        <SelectValue placeholder="Выберите график" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          <SelectItem value="views">Посещения</SelectItem>
          <SelectItem value="projects">Проекты</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ChartSelector;
