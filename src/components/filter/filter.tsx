import React, { useState } from 'react';
import RangeFilterDropdown from '@/components/filter/FilterFields/FilterRangeField';
import { getRangePairs } from '@/utils/utilsFunctions';
import { FilterConfig } from '@/utils/typos';
import FilterDropDown from './FilterFields/FilterDropDown';

// Define the structure for filter options

interface customFilterComponentProps {
  fields: FilterConfig[];
  onApply?: (key: string) => void;
  onReset: (key: string) => void;
}

const CustomFilterComponent: React.FC<customFilterComponentProps> = ({
  fields,
  onApply,
  onReset,
}) => {
  // Initialize state with empty values for each filter
  const [filters, setFilters] = useState<any>({});

  const handleApply = (key: string) => {
    console.log(`Applied filter from filter component: `, filters);
  }

  // Handle selection for both select and range filters
  const handleSelect = (key: string, item: string | number[]) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: Array.isArray(item) ? item : item === 'all' ? [] : [item],
    }));
  };

  // Render dropdown component based on filter type
  const rendercustomFilterComponent = (config: FilterConfig) => {
    switch (config.type) {
      case 'select':
        return (
          <FilterDropDown
            filterKey={config.key}
            filetrerOptions={config.options || []}
            selectedOptions={filters[config.key] as string[]}
            onSelectedOptionsChange={handleSelect}
            onApply={handleApply}
            onReset={onReset}
          />
        );
      case 'range':
        return (
          <RangeFilterDropdown
            filterKey={config.key}
            onRangeChange={handleSelect}
            onApply={handleApply}
            onReset={onReset}
            predefinedRanges={config.range ? getRangePairs(config.range[0], config.range[1]) : []}
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
          <div key={config.key}>{rendercustomFilterComponent(config)}</div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(CustomFilterComponent);