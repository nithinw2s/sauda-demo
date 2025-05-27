// src/styles/muiTheme.ts
import { createTheme } from '@mui/material/styles';
import { PaletteOptions } from '@mui/material/styles';


declare module '@mui/material/styles' {
  interface Palette {
    ochre: Palette['primary'];
    salmon: Palette['primary'];
  }
  interface PaletteOptions {
    ochre?: PaletteOptions['primary'];
    salmon?: PaletteOptions['primary'];
  }
}

let baseTheme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
    
  },
  typography: {
    fontFamily: 'Roboto, sans-serif, Raleway, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Raleway';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
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

baseTheme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [baseTheme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

baseTheme = createTheme(baseTheme, {
  // Custom colors created with augmentColor go here
  palette: {
    salmon: baseTheme.palette.augmentColor({
      color: {
        main: '#FF5733',
      },
      name: 'salmon',
    }),
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