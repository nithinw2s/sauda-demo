// types/filters.ts
export type FilterFieldType = 'dropdown' | 'checkbox' | 'slider' | 'text';

export interface FilterField {
  id: string;
  label: string;
  type: FilterFieldType;
  options?: { value: string; label: string }[]; // For dropdowns/checkboxes
  min?: number; // For sliders
  max?: number; // For sliders
}

export interface FilterConfig {
  key: string;
  type: 'select' | 'range';
  options?: string[]; 
  range?: [number, number]; 
};