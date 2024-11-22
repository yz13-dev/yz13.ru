import { Grid } from "@/types/widgets";
import { CSSProperties } from "react";



export const applyGrid = (grid: Grid["grid"]): CSSProperties => {
  return {
    // @ts-expect-error
    "--column-start": `${grid.column.start}`,
    "--column-end": `${grid.column.end}`,
    "--row-start": `${grid.row.start}`,
    "--row-end": `${grid.row.end}`,
  }
}