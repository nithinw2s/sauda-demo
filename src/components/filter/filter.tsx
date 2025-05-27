import React, { useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RangeFilterDropdown from "@/components/filter/FilterFields/FilterRangeField";
import { getRangePairs } from "@/utils/utilsFunctions";
import { FilterConfig } from "@/utils/typos";
import FilterDropDown from "./FilterFields/FilterDropDown";
import debounce from "lodash.debounce";

// Define the structure for filter options
interface CustomFilterComponentProps {
  fields: FilterConfig[];
  category?: string; // Optional category for the filter
  onApply?: (filters: Record<string, string[] | number[]>) => void;
  onReset: (key: string) => void;
}

const CustomFilterComponent: React.FC<CustomFilterComponentProps> = ({
  fields,
  category,
  onApply,
  onReset,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const debouncedPush = debounce((url: string) => {
    router.push(url, { scroll: false });
  }, 100);

  // Helper to get current filters from URL
  const getFiltersFromUrl = () => {
    const filters: Record<string, string[] | number[]> = {};
    fields.forEach((config) => {
      const param = searchParams.get(config.key);
      if (param) {
        if (config.type === "range") {
          // Parse range as numbers, e.g., "10-20" -> [10, 20]
          const [min, max] = param.split("-").map(Number);
          if (!isNaN(min) && !isNaN(max)) {
            filters[config.key] = [min, max];
          }
        } else {
          console.log(`Filter key: ${param}`);
          // Parse select as array of strings
          filters[config.key] = param.split(",");
        }
      } else {
        filters[config.key] = [];
      }
    });
    return filters;
  };

  // Handle selection for both select and range filters
  const handleSelect = (key: string, item: string | number[]) => {
    const currentFilters = getFiltersFromUrl();
    const newFilters = {
      ...currentFilters,
      [key]: Array.isArray(item) ? item : item === "all" ? [] : [item],
    };

    // Create new URLSearchParams
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([filterKey, value]) => {
      if (value.length > 0) {
        if (Array.isArray(value) && typeof value[0] === "number") {
          // Range: join numbers with hyphen, e.g., "10-20"
          params.set(filterKey, value.join("-"));
        } else {
          // Select: join strings with commas, e.g., "option1,option2"
          params.set(filterKey, value.join(","));
        }
      }
    });

    // Update URL without reloading the page
    debouncedPush(`?${params.toString()}`);
    // router.push(`?${params.toString()}`, { scroll: false });
  };

  // Handle reset for a specific filter
  const handleReset = (key: string) => {
    const currentFilters = getFiltersFromUrl();
    const newFilters = {
      ...currentFilters,
      [key]: [],
    };

    // Create new URLSearchParams
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([filterKey, value]) => {
      if (value.length > 0) {
        if (Array.isArray(value) && typeof value[0] === "number") {
          params.set(filterKey, value.join("-"));
        } else {
          params.set(filterKey, value.join(","));
        }
      }
    });

    // Update URL
    debouncedPush(`?${params.toString()}`);
    // router.push(`?${params.toString()}`, { scroll: false });

    // Call onReset and onApply
    onReset(key);
    if (onApply) {
      onApply(newFilters);
    }
  };

  // Apply filters from URL on component mount or query change
  // useEffect(() => {
  //   const filters = getFiltersFromUrl();
  //   if (onApply) {
  //     onApply(filters);
  //   }
  // }, [searchParams, onApply]);

  const handleApply = (key: string) => {
    const filters = getFiltersFromUrl();
    console.log(`Applied filter from filter component: `, filters);
    if (onApply) {
      onApply(filters);
    }
  };

  const renderCustomFilterComponent = (config: FilterConfig) => {
    const filters = getFiltersFromUrl();
    switch (config.type) {
      case "select":
        return (
          <FilterDropDown
            filterKey={config.key}
            filetrerOptions={config.options || []}
            selectedOptions={filters[config.key] || []}
            onSelectedOptionsChange={handleSelect}
            onApply={() => handleApply(config.key)}
            onReset={() => handleReset(config.key)}
          />
        );
      case "range":
        return (
          <RangeFilterDropdown
            filterKey={config.key}
            onRangeChange={handleSelect}
            onApply={() => handleApply(config.key)}
            onReset={() => handleReset(config.key)}
            predefinedRanges={
              config.range
                ? getRangePairs(config.range[0], config.range[1])
                : []
            }
            selectedRange={filters[config.key] as number[]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex flex-row justify-center mt-4 gap-2">
        {fields.map((config) => (
          <div key={config.key}>{renderCustomFilterComponent(config)}</div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(CustomFilterComponent);
