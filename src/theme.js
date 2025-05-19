// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
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

export default theme;
