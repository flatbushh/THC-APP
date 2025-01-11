// import { ThemeProvider } from "@mui/material";
// import { PropsWithChildren } from "react";
// import { theme } from "../theme/theme";
// import { AlertProvider } from "./AlertContext";
// import { AuthProvider } from "./AuthContext";

// export const ContextProvider = ({ children }: PropsWithChildren) => {
//   return (
//     <ThemeProvider theme={theme}>
//       <AlertProvider>
//         <AuthProvider>{children}</AuthProvider>
//       </AlertProvider>
//     </ThemeProvider>
//   );
// };

import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { AlertProvider } from "./AlertContext";
import { AuthProvider } from "./AuthContext";
import { theme } from "../theme/theme";

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={theme} defaultMode={prefersDarkMode ? 'dark' : 'light'}>
      <AlertProvider>
        <AuthProvider>{children}</AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
};
