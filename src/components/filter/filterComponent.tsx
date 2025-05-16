import { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  TextField,
  Button,
  styled,
} from '@mui/material';
import { FilterField } from '@/utils/typos';
import CustomButton from '../customButton';
import React from 'react';

interface FilterComponentProps {
  fields: FilterField[];
  onFilterChange: (filters: Record<string, any>) => void;
}

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default, 
    transition: theme.transitions.create(['background-color']),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.background.default,
    },
  },
}));

const FilterComponent: React.FC<FilterComponentProps> = ({ fields, onFilterChange }) => {
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});

  const handleChange = useCallback(
    (id: string, value: any) => {
      const updatedFilters = { ...filterValues, [id]: value };
      setFilterValues(updatedFilters);
      onFilterChange(updatedFilters);
    },
    [filterValues, onFilterChange],
  );

  const debouncedHandleChange = useCallback(
    debounce((id: string, value: any) => {
      handleChange(id, value);
    }, 300),
    [handleChange],
  );

  const resetFilters = () => {
    setFilterValues({});
    onFilterChange({});
  };

  const renderField = (field: FilterField) => {
    switch (field.type) {
      case 'dropdown':
        return (
          <FormControl fullWidth margin="normal">
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={filterValues[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              label={field.label}
            >
              <MenuItem value="">Select {field.label}</MenuItem>
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'checkbox':
        return (
          <FormGroup>
            {field.options?.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={filterValues[field.id]?.includes(option.value) || false}
                    onChange={() => {
                      const currentValues = filterValues[field.id] || [];
                      const newValues = currentValues.includes(option.value)
                        ? currentValues.filter((v: string) => v !== option.value)
                        : [...currentValues, option.value];
                      handleChange(field.id, newValues);
                    }}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
        );
      case 'slider':
        return (
          <Box sx={{ mt: 2, mb: 2 }}>
            <InputLabel>{field.label}</InputLabel>
            <Slider
              value={filterValues[field.id] || field.min || 0}
              onChange={(_, value) => debouncedHandleChange(field.id, value)}
              min={field.min}
              max={field.max}
              valueLabelDisplay="auto"
            />
          </Box>
        );
      case 'text':
        return (
          <CustomTextField
            fullWidth
            margin="normal"
            label={field.label}
            value={filterValues[field.id] || ''}
            onChange={(e) => debouncedHandleChange(field.id, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, display:'flex', 
    justifyContent: 'space-between', minWidth: '90vw', border: '1px solid black 0', 
    boxShadow:'rgba(0, 0, 0, 0.1) 0px 2px 4px' }}>
      {fields.map((field) => (
        <Box key={field.id} sx={{ mb: 2 }}>
          {renderField(field)}
        </Box>
      ))}
      <CustomButton onClick={resetFilters} size='small' >
        Reset Filters
      </CustomButton>
    </Box>
  );
};

export default React.memo(FilterComponent);