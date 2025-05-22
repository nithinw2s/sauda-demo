import { Button } from "@mui/material";
import React, { type FC, type ButtonHTMLAttributes, Children } from "react";

interface CustomButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "danger" | "outline" ;
    size?: "small" | "medium" | "large";
    disabled? : boolean;
    className?: string
};

const CustomButton: FC <CustomButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    className = '',
    ...props
}) => {

    const baseStyles = 'inline-flex items-center justify-center rounded-md duration-200';
    
    const variantStyles = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
    }

    const sizeStyles = {
        small: 'px-1 py-1 text-sm',
        medium: 'px-3 py-2 text-base',
        large: 'px-5 py-3 text-lg'
    };

    const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

    
    const btnStyle = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;
    

    return (
        <Button
            className={btnStyle}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </Button>)

};

export default CustomButton;