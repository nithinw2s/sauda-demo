'use client';
import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import CustomFilterComponent from '@/components/filter/filter';
import { FilterConfig } from '@/utils/typos';

interface CategoryPageProps {
  category: string;
  filterConfigs: FilterConfig[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, filterConfigs }) => {
  return (
    <ProtectedRoute>
      <CustomFilterComponent
        fields={filterConfigs}
        category={category}
        onApply={(key: string) => console.log(`Applied filter: ${key}`)}
        onReset={(key: string) => console.log(`Reset filter: ${key}`)}
      />
    </ProtectedRoute>
  );
};

export default CategoryPage;