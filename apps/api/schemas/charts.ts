import { z } from "zod";

export const chartDataPointSchema = z.object({
  label: z.string(),
  month: z.number(),
  count: z.number(),
});

export const chartDataArraySchema = z.array(chartDataPointSchema);

export type ChartDataPoint = z.infer<typeof chartDataPointSchema>;
export type ChartDataArray = z.infer<typeof chartDataArraySchema>; 