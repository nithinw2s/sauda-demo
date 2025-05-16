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