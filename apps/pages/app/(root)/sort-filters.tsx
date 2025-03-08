"use client";
import FiltersBar from "./filters-bar";

const SortFilters = ({ value }: { value?: string }) => {
  return (
    <FiltersBar
      value={value}
      className="bg-background border-b z-20 sticky top-0"
      filters={[
        {
          value: "popular",
          label: "Популярные",
        },
        {
          value: "new",
          label: "Новые",
        },
      ]}
    />
  );
};

export default SortFilters;
