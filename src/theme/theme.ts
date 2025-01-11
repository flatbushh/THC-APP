import { createTheme } from "@mui/material";
import { darkPalette } from "./palette/dark";
import { lightPalette } from "./palette/light";

export const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: darkPalette
    },
    light: {
      palette: lightPalette
    }
  },
  typography: {
      fontFamily: "Poppins', sans-serif",
      h1: {
        fontSize: "3rem",
        fontWeight: 600,
      },
      h2: {
        fontSize: "2.5rem",
        fontWeight: 500,
      },
      h3: {
        fontSize: "2rem",
        fontWeight: 500,
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 400,
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 400,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 400,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 300,
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          color: ''
        }
      }
    }
})

