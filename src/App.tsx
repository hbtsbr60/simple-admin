import React from "react";
import { Button, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { ColorModeProvider, useAppTheme } from "config/theme";

function App() {
  const { colorMode, theme } = useAppTheme();

  return (
    <ColorModeProvider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Button variant="contained" onClick={colorMode.toggleColorMode}>
          Hello World
        </Button>
      </ThemeProvider>
    </ColorModeProvider>
  );
}

export default App;
