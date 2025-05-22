// src/styles/muiTheme.ts
import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'inherit',
            color: 'inherit',
          },
          '&:focus': {
            outline: 'none',
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
});

// Route-specific themes
export const themes = {
  home: createTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      primary: { main: '#4caf50' },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: {
            color: '#4caf50',
          },
        },
      },
    },
  }),
  bike: createTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      primary: { main: '#0288d1' },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            padding: '8px 16px',
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          // paper: {
          //   border: '1px solid #0288d1',
          //   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          // },
        },
      },
    },
  }),

  mobiles: createTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      primary: { main: '#f44336' }, 
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            padding: '10px 20px',
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: {
            color: '#f44336',
          },
        },
      },
    },
  }),
};