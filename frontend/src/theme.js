import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#40E0D0',  // Turquoise
      contrastText: '#fff',
    },
    secondary: {
      main: '#003366',  // Dark blue
      contrastText: '#fff',
    },
    background: {
      default: '#e0f7fa',  // Light turquoise
      paper: '#ffffff',    // White for paper elements
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #40E0D0 0%, #003366 100%)',
        },
      },
    },
  },
});

export default theme;