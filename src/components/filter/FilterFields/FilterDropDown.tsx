import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import CustomButton from "../../customButton";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CustomMenuItem } from "../../customComponents/customComponents";

interface FilterDropDownProps {
    filterKey: string;
    filetrerOptions: string[];
    selectedOptions: string[];
    onSelectedOptionsChange: (selectedOptions: string, index: string) => void;
    onApply: (key: string) => void;
    onReset: (key: string) => void;
    buttonClassName?: string;
    menuStyle?: React.CSSProperties;
    wrapperStyle?: React.CSSProperties;
    textStyle?: React.CSSProperties;
    activateTextStyle?: React.CSSProperties;
    activateeContainerStyle?: React.CSSProperties;
    applyButtonStyle?: React.CSSProperties;
    resetButtonStyle?: React.CSSProperties;
};

const FilterDropDown = ({
    filterKey,
    filetrerOptions,
    selectedOptions,
    onSelectedOptionsChange,
    onApply,
    onReset,
    buttonClassName = 'bg-white text-black',
    menuStyle = {},
    wrapperStyle = {},
    textStyle = {},
    activateTextStyle = {},
    activateeContainerStyle = {},
    applyButtonStyle = {},
    resetButtonStyle = {},
}: FilterDropDownProps) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="border border-gray-600 rounded-lg max-h-fit" style={wrapperStyle}>
            <Button
                id={`basic-button-${filterKey}`}
                aria-controls={Boolean(anchorEl) ? `basic-menu-${filterKey}` : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                onClick={handleClick}
                endIcon={Boolean(anchorEl) ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                className={`flex items-center gap-2 ${buttonClassName}`}
            >
                <div className="flex flex-col items-center gap-2" >
                    {filterKey}
                    <span style={{ ...textStyle, marginLeft: "4px", fontSize: "10px", color: "#888888" }}>
                        {`Selected: ${selectedOptions?.length > 0 ? selectedOptions.join(', ') : 'None'}`}
                    </span>
                </div>
            </Button>
            <Menu
                autoFocus={false}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <div style={{ padding: '8px 16px' , display: 'flex', minWidth: '70px', maxWidth: '200px', flexWrap: 'wrap', gap: '8px'}}>
                    {filetrerOptions.map((option, index) => (
                        <div
                            key={index}
                            className={`flex items-center gap-2 cursor-pointer hover:bg-blue-300 px-2 py-1 border-2 border-solid black rounded-[10%] ${selectedOptions?.includes(option) ? 'bg-blue-300' : 'bg-blue-50'}`}
                            onClick={() => onSelectedOptionsChange(filterKey, option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
                <div>
                    <div className="flex justify-evenly items-center w-full">
                        <CustomButton onClick={() => { onApply(filterKey); handleClose(); }}>Apply</CustomButton>
                        <CustomButton onClick={() => { onReset(filterKey); handleClose(); }}>Reset</CustomButton>
                    </div>
                </div>
            </Menu>
        </div>
    )
};

export default React.memo(FilterDropDown);