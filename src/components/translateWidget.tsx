// src/components/TranslateWidget.tsx
import React, { useEffect } from "react";
import { Box, FormControl, Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
  }
}

const TranslateWidget: React.FC = () => {
  const theme = useTheme();

  useEffect(() => {
    // Ensure Google Translate script is loaded before initializing
    if (typeof window?.googleTranslateElementInit === "function") {
      window?.googleTranslateElementInit();
    }
  }, []);

  return (
    <Box
      id="google_translate_element"
      sx={{
        display: "flex",
        alignItems: "center",
        "& .goog-te-combo": {
          padding: "8px",
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: "14px",
          cursor: "pointer",
        },
      }}
      className="translate-widget"
    />
  );
};

export default TranslateWidget;
