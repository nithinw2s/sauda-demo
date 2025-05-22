// src/components/ThemeSwitcher.tsx
import React from 'react';
import { usePathname } from 'next/navigation'
import { themes } from './muiTheme';
import { ThemeProvider, CssBaseline } from '@mui/material';

interface ThemeSwitcherProps {
  children: React.ReactNode;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ children }) => {
  const path = usePathname();
  console.log('Current path:', path);
  let theme = themes.home; // Default theme

  switch (path) {
    case '/bike':
      theme = themes.bike;
      break;
    case '/mobiles':
      theme = themes.mobiles;
      break;
    default:
      theme = themes.home;
      break;
  }

  return <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
    </ThemeProvider>;
};

export default ThemeSwitcher;