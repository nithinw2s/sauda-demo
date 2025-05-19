import React, { useState } from 'react';
import FilterDropDown from '@/components/filter/filterDropDown';

const MobileComponet: React.FC = () => {

  const [filters, setFilters] = useState({
    rating: [],
    curriculum: [],
    courses: [],
  });
  console.log('Filters:', filters);

  const filterOptions = {
    rating: ['1', '2', '3', '4', '5'],
    curriculum: ['IB', 'AP', 'CBSE'],
    courses: ['Math', 'Science', 'History'],
  };

  const handleSelect = (key: string, item: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: item === 'all' ? [] : [item], // Single selection logic
    }));
  };

  const handleApply = (key: string) => {
    console.log("with values:", filters);
  };

  const handleReset = (key: string) => {
    setFilters((prev) => ({ ...prev, [key]: [] }));
  };

  return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='mt-8'>Electrical Component</h1>
        <div className='flex flex-row justify-center h-screen mt-4'>
      <FilterDropDown
        filterKey="rating"
        filetrerOptions={filterOptions.rating}
        selectedOptions={filters.rating}
        onSelectedOptionsChange={handleSelect}
        onApply={handleApply}
        onReset={handleReset}
      />
      <FilterDropDown
        filterKey="curriculum"
        filetrerOptions={filterOptions.curriculum}
        selectedOptions={filters.curriculum}
        onSelectedOptionsChange={handleSelect}
        onApply={handleApply}
        onReset={handleReset}
      />
      <FilterDropDown
        filterKey="courses"
        filetrerOptions={filterOptions.courses}
        selectedOptions={filters.courses}
        onSelectedOptionsChange={handleSelect}
        onApply={handleApply}
        onReset={handleReset}
      />
        </div>
    </div>
  );
};

export default MobileComponet;