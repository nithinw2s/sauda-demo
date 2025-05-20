import React, { useState, useEffect } from "react";
import { Button, Menu, Slider } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CustomButton from "../../customButton";
import { debounce } from "lodash";

interface RangeFilterDropdownProps {
  filterKey: string;
  onRangeChange: (filterKey: string, range: [number, number]) => void;
  onApply: (filterKey: string) => void;
  onReset: (filterKey: string) => void;
  predefinedRanges: [number, number][];
  buttonClassName?: string;
  menuStyle?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

const RangeFilterDropdown = ({
  filterKey,
  onRangeChange,
  onApply,
  onReset,
  predefinedRanges,
  buttonClassName = 'bg-white text-black',
  menuStyle = {},
  wrapperStyle = {},
  textStyle = {},
}: RangeFilterDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRange, setSelectedRange] = useState<[number, number]>([0, 100]);
  const [sliderValue, setSliderValue] = useState<[number, number]>([0, 100]);

  // Sync slider value with selected range
  useEffect(() => {
    setSliderValue(selectedRange);
  }, [selectedRange]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRangeSelect = (range: [number, number]) => {
    setSelectedRange(range);
    onRangeChange(filterKey, range);
  };

  const handleSliderChange = debounce((event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setSliderValue([newValue[0], newValue[1]]);
      onRangeChange(filterKey, [newValue[0], newValue[1]]);
      setSelectedRange([newValue[0], newValue[1]]);
    }
  }, 300);

  const handleApply = () => {
    onApply(filterKey);
    handleClose();
  };

  const handleReset = () => {
    setSelectedRange([0, 100]);
    setSliderValue([0, 100]);
    onReset(filterKey);
    handleClose();
  };

  const sliderMin = Math.min(...predefinedRanges.map(([min]) => min));
  const sliderMax = Math.max(...predefinedRanges.map(([, max]) => max));

  return (
    <div className="border border-gray-600 rounded-lg max-h-fit" style={wrapperStyle}>
      <Button
        id={`range-button-${filterKey}`}
        aria-controls={Boolean(anchorEl) ? `range-menu-${filterKey}` : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? "true" : undefined}
        onClick={handleClick}
        endIcon={Boolean(anchorEl) ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        className={`flex items-center gap-2 ${buttonClassName}`}
      >
        <div className="flex flex-col items-center gap-2">
          {filterKey}
          <span style={{ ...textStyle, marginLeft: "4px", fontSize: "10px", color: "#888888" }}>
            {`Range: $${sliderValue[0]} - $${sliderValue[1]}`}
          </span>
        </div>
      </Button>
      <Menu
        autoFocus={false}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{ style: { ...menuStyle, minWidth: '250px', padding: '8px' } }}
      >
        <div style={{ padding: '8px 16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {predefinedRanges.map((range, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 cursor-pointer hover:bg-blue-300 px-2 py-1 border-2 border-solid border-gray-600 rounded-[10%] ${
                selectedRange[0] === range[0] && selectedRange[1] === range[1] ? 'bg-blue-300' : 'bg-blue-50'
              }`}
              onClick={() => handleRangeSelect(range)}
            >
              {`$${range[0]} - $${range[1]}`}
            </div>
          ))}
        </div>
        <div style={{ padding: '16px' }}>
          <Slider
            value={sliderValue}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={sliderMin}
            max={sliderMax}
            step={10}
            marks={[
              { value: sliderMin, label: `$${sliderMin}` },
              { value: sliderMax, label: `$${sliderMax}` },
            ]}
            sx={{ margin: '16px 0' }}
          />
        </div>
        <div className="flex justify-evenly items-center w-full">
          <CustomButton onClick={handleApply}>Apply</CustomButton>
          <CustomButton onClick={handleReset}>Reset</CustomButton>
        </div>
      </Menu>
    </div>
  );
};

export default React.memo(RangeFilterDropdown);