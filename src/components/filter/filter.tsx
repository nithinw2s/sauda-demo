import React, { useState, useEffect, useCallback } from 'react';
import RangeFilterDropdown from '@/components/filter/FilterFields/FilterRangeField';
import { getRangePairs } from '@/utils/utilsFunctions';
import { FilterConfig } from '@/utils/typos';
import FilterDropDown from './FilterFields/FilterDropDown';

// Define the structure for filter options
interface CustomFilterComponentProps {
  fields: FilterConfig[];
  category: string; // Added category prop
  onApply?: (key: string) => void;
  onReset: (key: string) => void;
}

const CustomFilterComponent: React.FC<CustomFilterComponentProps> = ({
  fields,
  category,
  onApply,
  onReset,
}) => {
  // Initialize state for filters and listings
  const [filters, setFilters] = useState<any>({});
  const [listings, setListings] = useState<any[]>([]);

  // Fetch listings from the backend
  const fetchListings = useCallback(async () => {
    try {
      const queryParams: any = { category };
      if (filters.price && Array.isArray(filters.price)) {
        queryParams.price_min = filters.price[0];
        queryParams.price_max = filters.price[1];
      }
      Object.keys(filters).forEach((key) => {
        if (key !== 'price' && filters[key]?.length > 0) {
          queryParams[key] = filters[key][0];
        }
      });

      const queryString = new URLSearchParams(queryParams).toString();
      const response = await fetch(`http://127.0.0.1:8000/api/listings/filter/?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setListings([]);
    }
  }, [filters, category]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleApply = (key: string) => {
    console.log(`Applied filter from filter component: `, filters);
    onApply?.(key);
  };

  // Handle selection for both select and range filters
  const handleSelect = (key: string, item: string | number[]) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: Array.isArray(item) ? item : item === 'all' ? [] : [item],
    }));
  };
  
  // Reset individual filter
  const handleFilterReset = (key: string) => {
    setFilters((prev: any) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
    onReset(key);
  };

  // Reset all filters
  const resetAllFilters = () => {
    setFilters({});
    console.log('All filters reset');
  };
  // Render dropdown component based on filter type
  const rendercustomFilterComponent = (config: FilterConfig) => {
    switch (config.type) {
      case 'select':
        return (
          <FilterDropDown
            filterKey={config.key}
            filetrerOptions={config.options || []}
            selectedOptions={filters[config.key] || []} // Fixed to handle initial undefined
            onSelectedOptionsChange={handleSelect}
            onApply={handleApply}
            onReset={() => handleFilterReset(config.key)}
          />
        );
      case 'range':
        return (
          <RangeFilterDropdown
            filterKey={config.key}
            onRangeChange={handleSelect}
            onApply={handleApply}
            onReset={() => handleFilterReset(config.key)}
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
        {fields.length > 0 ? (
          fields.map((config) => (
            <div key={config.key}>{rendercustomFilterComponent(config)}</div>
          ))
        ) : (
          <p>No filters available for this category.</p>
        )}
      </div>
      <div className="mt-8">
        <h2>Listings</h2>
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div key={listing.id} className="border p-4 my-2 rounded-lg">
              <h3>{listing.title}</h3>
              <p>Price: ${listing.price}</p>
              <p>Brand: {listing.brand}</p>
              {listing.category === 'automobiles' && listing.automobile && (
                <p>Model: {listing.automobile.model}</p>
              )}
            </div>
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(CustomFilterComponent);